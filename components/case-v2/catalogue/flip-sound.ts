import { useCallback, useEffect, useRef } from "react";

const SAMPLE = "/work/droguerie-souss/catalogue/page-flip.ogg";

type Clip = { buffer: AudioBuffer; offset: number; duration: number };

function brownNoise(ctx: BaseAudioContext, frames: number) {
  const buf = ctx.createBuffer(1, frames, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < frames; i++) {
    last = (last + 0.045 * (Math.random() * 2 - 1)) / 1.045;
    d[i] = last * 3.2;
  }
  return buf;
}

function fibreNoise(ctx: BaseAudioContext, frames: number) {
  const buf = ctx.createBuffer(1, frames, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let b0 = 0,
    b1 = 0,
    b2 = 0,
    grain = 0,
    grainLen = 0,
    amp = 0;
  for (let i = 0; i < frames; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + w * 0.099046;
    b1 = 0.963 * b1 + w * 0.2965164;
    b2 = 0.57555 * b2 + w * 1.0526913;
    const pink = (b0 + b1 + b2 + w * 0.1848) * 0.22;
    if (grain <= 0) {
      grainLen = Math.floor(ctx.sampleRate * (0.003 + Math.random() * 0.011));
      grain = grainLen;
      amp = 0.35 + Math.random() * 0.65;
    }
    d[i] = pink * amp * Math.sin(Math.PI * (1 - grain / grainLen));
    grain--;
  }
  return buf;
}

// Cuts the silence around the recording so the sound lands with the turn.
function trim(buffer: AudioBuffer): Clip {
  const d = buffer.getChannelData(0);
  const sr = buffer.sampleRate;
  const win = Math.max(1, Math.floor(sr * 0.005));
  let peak = 0;
  const env: number[] = [];
  for (let i = 0; i < d.length; i += win) {
    let m = 0;
    for (let j = i; j < Math.min(i + win, d.length); j++) m = Math.max(m, Math.abs(d[j]));
    env.push(m);
    peak = Math.max(peak, m);
  }
  if (peak < 0.01) return { buffer, offset: 0, duration: buffer.duration };
  const a = Math.max(0, env.findIndex((v) => v >= peak * 0.12));
  let b = a;
  for (let i = a; i < env.length; i++) if (env[i] >= peak * 0.04) b = i;
  const start = Math.max(0, (a * win) / sr - 0.012);
  const end = Math.min(buffer.duration, ((b + 1) * win) / sr + 0.06);
  return { buffer, offset: start, duration: Math.max(0.12, Math.min(0.9, end - start)) };
}

function noise(
  ctx: AudioContext,
  bus: AudioNode,
  buffer: AudioBuffer,
  filter: BiquadFilterNode,
  at: number,
  peak: number,
  attack: number,
  length: number,
) {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(peak, at + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, at + length);
  src.connect(filter).connect(g).connect(bus);
  src.start(at);
  src.stop(at + length);
}

// Reads `on` through a ref: react-pageflip keeps the first onFlip it is given.
export function useFlipSound(on: boolean) {
  const enabled = useRef(on);
  const ctxRef = useRef<AudioContext | null>(null);
  const busRef = useRef<GainNode | null>(null);
  const clip = useRef<Clip | null>(null);

  useEffect(() => {
    enabled.current = on;
  }, [on]);

  useEffect(() => {
    const unlock = () => {
      if (!ctxRef.current) {
        const Ctor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        const ctx = new Ctor();
        const bus = ctx.createGain();
        bus.gain.value = 0.9;
        const tame = ctx.createBiquadFilter();
        tame.type = "lowpass";
        tame.frequency.value = 4200;
        tame.Q.value = 0.5;
        bus.connect(tame);
        tame.connect(ctx.destination);
        ctxRef.current = ctx;
        busRef.current = bus;
        fetch(SAMPLE)
          .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject()))
          .then((data) => ctx.decodeAudioData(data))
          .then((buffer) => (clip.current = trim(buffer)))
          .catch(() => {});
      }
      void ctxRef.current?.resume();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  return useCallback(() => {
    const ctx = ctxRef.current;
    const bus = busRef.current;
    if (!enabled.current || !ctx || !bus || ctx.state !== "running") return;

    const now = ctx.currentTime;
    const rate = 0.92 + Math.random() * 0.18;

    if (clip.current) {
      const { buffer, offset, duration } = clip.current;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.playbackRate.value = rate;
      const g = ctx.createGain();
      const end = now + duration / rate;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.9, now + 0.008);
      g.gain.setValueAtTime(0.9, end - 0.04);
      g.gain.linearRampToValueAtTime(0.0001, end);
      src.connect(g).connect(bus);
      src.start(now, offset, duration);
      return;
    }

    // No recording (e.g. no Ogg support): air, fibres, then the sheet landing.
    const airDur = 0.42 * rate;
    const air = ctx.createBiquadFilter();
    air.type = "lowpass";
    air.frequency.setValueAtTime(1500, now);
    air.frequency.exponentialRampToValueAtTime(260, now + airDur);
    air.Q.value = 0.8;
    noise(ctx, bus, brownNoise(ctx, Math.floor(ctx.sampleRate * airDur)), air, now, 0.5, 0.07 * rate, airDur);

    const fibDur = 0.34 * rate;
    const fib = ctx.createBiquadFilter();
    fib.type = "bandpass";
    fib.Q.value = 0.55;
    fib.frequency.setValueAtTime(1900, now);
    fib.frequency.exponentialRampToValueAtTime(620, now + fibDur);
    noise(ctx, bus, fibreNoise(ctx, Math.floor(ctx.sampleRate * fibDur)), fib, now + 0.01, 0.3, 0.05 * rate, fibDur);

    const tapAt = now + (0.24 + Math.random() * 0.05) * rate;
    const tap = ctx.createBiquadFilter();
    tap.type = "lowpass";
    tap.frequency.value = 1100 + Math.random() * 400;
    noise(ctx, bus, fibreNoise(ctx, Math.floor(ctx.sampleRate * 0.09)), tap, tapAt, 0.26, 0.012, 0.09);
  }, []);
}
