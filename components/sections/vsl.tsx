"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

/** `M:SS`, with a stable width so the timecode never jitters. */
function timecode(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

export function Vsl() {
  const { t } = useLanguage();
  const chapters = t.vsl.chapters;

  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [chapter, setChapter] = useState(0);

  /*
   * The runtime is written to the DOM rather than held in state. Metadata for
   * a local file often lands before hydration attaches a React handler, so the
   * `loadedmetadata` event alone would leave the label reading 0:00; this reads
   * whatever the element already knows and keeps listening for the rest.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const read = () => {
      if (totalRef.current) totalRef.current.textContent = timecode(video.duration);
    };

    read();
    video.addEventListener("loadedmetadata", read);
    video.addEventListener("durationchange", read);
    return () => {
      video.removeEventListener("loadedmetadata", read);
      video.removeEventListener("durationchange", read);
    };
  }, []);

  /*
   * Playback progress is written straight to the DOM from a rAF loop: at 60fps
   * a `timeupdate`-driven state update would re-render the whole section
   * several times a second for a bar that is pure presentation. Only the
   * active chapter — which changes twice per play-through — is state.
   */
  useEffect(() => {
    if (!playing) return;

    const step = () => {
      const video = videoRef.current;
      if (video && video.duration > 0) {
        const ratio = video.currentTime / video.duration;
        barRef.current?.style.setProperty("transform", `scaleX(${ratio})`);
        if (elapsedRef.current) {
          elapsedRef.current.textContent = timecode(video.currentTime);
        }
        const next = Math.min(
          chapters.length - 1,
          Math.floor(ratio * chapters.length),
        );
        setChapter((active) => (active === next ? active : next));
      }
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [playing, chapters.length]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  /** Jump to a chapter's share of the runtime and keep playing from there. */
  const seekToChapter = useCallback(
    (index: number) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = (video.duration / chapters.length) * index;
      setChapter(index);
      if (video.paused) void video.play();
    },
    [chapters.length],
  );

  return (
    <section
      id="methode"
      className="grain bg-forest relative overflow-hidden py-24 sm:py-32"
    >

      <div className="container-eiden relative z-2">
        {/* ── Statement ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-gold flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-8 origin-left bg-current opacity-50 motion-safe:[animation:eiden-underline_0.8s_var(--ease-brand)_0.15s_both]"
                />
                {t.vsl.eyebrow}
              </p>
            </Reveal>

            <RevealWords
              as="h2"
              text={t.vsl.title}
              delay={0.08}
              className="text-canvas mt-6 text-[clamp(2rem,4.8vw,3.5rem)]"
            />

            <Reveal delay={0.22}>
              <p className="text-canvas/60 mt-6 max-w-xl text-base leading-relaxed sm:text-[1.0625rem]">
                {t.vsl.text}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3} direction="left" className="shrink-0">
            <ButtonLink href="/contact" variant="gold" size="lg" dot>
              {t.vsl.cta}
            </ButtonLink>
          </Reveal>
        </div>

        {/* ── Player ─────────────────────────────────────────────────── */}
        <Reveal delay={0.1} duration={1} amount={0.15} className="mt-14">
          <div className="group border-canvas/10 bg-ink relative overflow-hidden rounded-[1.25rem] border shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)] sm:rounded-[1.75rem]">
            <video
              ref={videoRef}
              className={cn(
                "aspect-16/10 w-full object-cover",
                "transition-transform duration-[1200ms] ease-[var(--ease-brand)] motion-reduce:transition-none",
                playing ? "scale-100" : "scale-[1.03] group-hover:scale-100",
              )}
              poster="/work/eiden-hero.png"
              playsInline
              muted={muted}
              loop
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src="/media/eiden-method.mp4" type="video/mp4" />
            </video>

            {/* Vignette that lifts once playback starts */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,15,12,0.88),transparent_52%)]",
                "transition-opacity duration-700",
                playing ? "opacity-45" : "opacity-100",
              )}
            />

            {/* Centre control — the ring breathes while paused */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? t.vsl.pause : t.vsl.play}
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "transition-opacity duration-500",
                playing
                  ? "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                  : "opacity-100",
              )}
            >
              <span className="relative flex size-20 items-center justify-center sm:size-24">
                {!playing ? (
                  <>
                    <span
                      aria-hidden
                      className="border-canvas/70 absolute inset-0 rounded-full border motion-safe:[animation:eiden-pulse-ring_2.6s_ease-out_infinite]"
                    />
                    <span
                      aria-hidden
                      className="border-canvas/70 absolute inset-0 rounded-full border motion-safe:[animation:eiden-pulse-ring_2.6s_ease-out_1.3s_infinite]"
                    />
                  </>
                ) : null}

                <span
                  className={cn(
                    "bg-canvas/95 text-forest relative flex size-full items-center justify-center rounded-full backdrop-blur-sm",
                    "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]",
                    "transition-transform duration-400 ease-[var(--ease-brand)]",
                    "group-hover:scale-[1.06] active:scale-95 motion-reduce:transition-none",
                  )}
                >
                  {/* Both glyphs stay mounted and cross-fade in place */}
                  <Play
                    aria-hidden
                    strokeWidth={0}
                    className={cn(
                      "absolute ml-1 size-7 fill-current transition-[opacity,transform] duration-300",
                      playing ? "scale-75 opacity-0" : "scale-100 opacity-100",
                    )}
                  />
                  <Pause
                    aria-hidden
                    strokeWidth={0}
                    className={cn(
                      "absolute size-7 fill-current transition-[opacity,transform] duration-300",
                      playing ? "scale-100 opacity-100" : "scale-75 opacity-0",
                    )}
                  />
                </span>
              </span>
            </button>

            {/* Transport rail — timecode, progress, sound.
                It carries its own tinted pill so the controls stay legible
                whatever the frame underneath happens to be. */}
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-6 sm:pb-6">
              <div className="border-canvas/15 bg-ink/60 flex items-center gap-4 rounded-full border py-2 pr-2 pl-5 backdrop-blur-xl">
                <span className="font-label text-canvas text-[0.7rem] tracking-[0.18em] tabular-nums">
                  <span ref={elapsedRef}>0:00</span>
                  <span className="text-canvas/45">
                    {" / "}
                    <span ref={totalRef}>0:00</span>
                  </span>
                </span>

                <span
                  aria-hidden
                  className="bg-canvas/20 relative h-[3px] flex-1 overflow-hidden rounded-full"
                >
                  <span
                    ref={barRef}
                    className="bg-gold absolute inset-0 origin-left rounded-full"
                    style={{ transform: "scaleX(0)" } as CSSProperties}
                  />
                </span>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? t.vsl.unmute : t.vsl.mute}
                  className="border-canvas/20 text-canvas hover:bg-canvas hover:text-ink flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
                >
                  {muted ? (
                    <VolumeX className="size-4" strokeWidth={1.7} aria-hidden />
                  ) : (
                    <Volume2 className="size-4" strokeWidth={1.7} aria-hidden />
                  )}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Chapters — each one seeks the film ─────────────────────── */}
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {chapters.map((entry, index) => {
            const active = playing && chapter === index;
            return (
              <Reveal key={entry.n} delay={0.06 * index} amount={0.2}>
                <button
                  type="button"
                  onClick={() => seekToChapter(index)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "group/chapter relative h-full w-full overflow-hidden rounded-2xl border p-6 text-left",
                    "transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "hover:-translate-y-1",
                    active
                      ? "border-gold/40 bg-forest-md"
                      : "border-canvas/10 bg-forest-md/50 hover:border-canvas/25",
                  )}
                >
                  {/* Fill line — reads as the chapter's slot in the runtime */}
                  <span
                    aria-hidden
                    className={cn(
                      "bg-gold absolute inset-x-0 top-0 h-px origin-left",
                      "transition-transform duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "font-label text-sm font-semibold tracking-[0.2em] transition-colors duration-500",
                        active ? "text-gold" : "text-canvas/40",
                      )}
                    >
                      {entry.n}
                    </span>
                    <span
                      className={cn(
                        "border-canvas/15 text-canvas/70 flex size-8 items-center justify-center rounded-full border",
                        "transition-[transform,border-color,color] duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none",
                        "group-hover/chapter:border-gold/50 group-hover/chapter:text-gold group-hover/chapter:scale-110",
                      )}
                    >
                      <Play
                        aria-hidden
                        strokeWidth={0}
                        className="ml-0.5 size-3 fill-current"
                      />
                    </span>
                  </div>

                  <h3 className="font-display text-canvas mt-4 text-lg font-bold tracking-[-0.02em]">
                    {entry.label}
                  </h3>
                  <p className="text-canvas/55 mt-2 text-sm leading-relaxed">
                    {entry.text}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
