"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

function timecode(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

const GROWTH_SHARE = 0.86;

export function Vsl() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let painted = Number.NaN;

    const paint = () => {
      const { top, height } = track.getBoundingClientRect();
      // The frame is pinned for `height − viewport`; that span is the growth.
      const travel = height - window.innerHeight;
      const share = travel > 0 ? -top / travel : 1;
      const eased = Math.min(Math.max(share / GROWTH_SHARE, 0), 1);
      const value = Math.round(eased * 500) / 500;

      if (value !== painted) {
        painted = value;
        section.style.setProperty("--grow", `${value}`);
        // Past the halfway point the room is lit, and anything fixed over it
        // has to be drawn the other way round.
        const tone = value > 0.55 ? "light" : "dark";
        if (litRef.current?.dataset.navTone !== tone) {
          litRef.current?.setAttribute("data-nav-tone", tone);
        }
      }
      raf = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Painted straight away rather than on the next frame: `--grow`
        // defaults to lit, so one unpainted frame is a flash of white.
        if (entry.isIntersecting) {
          if (!raf) paint();
          return;
        }
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "25% 0px" },
    );

    observer.observe(track);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const split = splitRef.current;
    if (!split) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let painted = Number.NaN;

    const paint = () => {
      const { top, height } = split.getBoundingClientRect();
      const travel = height - window.innerHeight;
      const share = travel > 0 ? -top / travel : 1;
      const value = Math.round(Math.min(Math.max(share, 0), 1) * 500) / 500;

      if (value !== painted) {
        painted = value;
        split.style.setProperty("--split", `${value}`);
      }
      raf = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) paint();
          return;
        }
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "25% 0px" },
    );

    observer.observe(split);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
      }
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [playing]);

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

  const goFullscreen = useCallback(() => {
    const video = videoRef.current as
      (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!video) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    if (video.requestFullscreen) void video.requestFullscreen();
    else video.webkitEnterFullscreen?.();
  }, []);

  const withGrow = { opacity: "var(--grow, 1)" } as CSSProperties;

  return (
    <section
      id="methode"
      ref={sectionRef}
      className="pointer-events-none relative z-10"
    >
      <div
        ref={litRef}
        data-nav-tone="dark"
        className="grain bg-forest pointer-events-auto relative"
      >
        <span aria-hidden className="vsl-wash" />
        <div ref={trackRef} className="vsl-track relative z-2">
          <div
            className={cn(
              "sticky top-0 isolate flex h-svh flex-col items-center px-5 sm:px-8",
              "motion-reduce:static motion-reduce:h-auto motion-reduce:py-14",
            )}
          >
            <span aria-hidden className="vsl-bloom" />
            <div className="flex flex-1 flex-col justify-end pb-12 md:pb-8">
              <Reveal direction="none" duration={0.5}>
                <p className="eyebrow vsl-ink-gold">{t.vsl.eyebrow}</p>
              </Reveal>
            </div>
            <div className="vsl-stage w-full">
              <div className="vsl-grow group bg-ink overflow-hidden">
                <video
                  ref={videoRef}
                  className="size-full object-cover"
                  poster="/work/eiden-hero.png"
                  playsInline
                  autoPlay
                  muted={muted}
                  loop
                  preload="metadata"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                >
                  <source src="/media/eiden-method.mp4" type="video/mp4" />
                </video>

                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,15,12,0.88),transparent_52%)]",
                    "transition-opacity duration-700",
                    playing ? "opacity-45" : "opacity-100",
                  )}
                />

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

                <span
                  style={withGrow}
                  className="font-label text-canvas/70 absolute bottom-0 left-0 hidden p-5 text-[0.8rem] tracking-[0.18em] tabular-nums sm:block"
                >
                  <span ref={elapsedRef}>0:00</span>
                  <span className="text-canvas/40">
                    {" / "}
                    <span ref={totalRef}>0:00</span>
                  </span>
                </span>

                <div
                  style={withGrow}
                  className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2.5 p-4 sm:p-5"
                >
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? t.vsl.unmute : t.vsl.mute}
                    className="border-canvas/20 bg-ink/60 text-canvas hover:bg-canvas hover:text-ink font-label flex items-center gap-2 rounded-full border px-4 py-2 text-[0.75rem] font-bold tracking-[0.18em] uppercase backdrop-blur-xl transition-colors duration-300"
                  >
                    {muted ? (
                      <VolumeX className="size-3.5" strokeWidth={1.7} aria-hidden />
                    ) : (
                      <Volume2 className="size-3.5" strokeWidth={1.7} aria-hidden />
                    )}
                    {t.vsl.sound}
                  </button>

                  <button
                    type="button"
                    onClick={goFullscreen}
                    className="border-canvas/20 bg-ink/60 text-canvas hover:bg-canvas hover:text-ink font-label flex items-center gap-2 rounded-full border px-4 py-2 text-[0.75rem] font-bold tracking-[0.18em] uppercase backdrop-blur-xl transition-colors duration-300"
                  >
                    <Maximize className="size-3.5" strokeWidth={1.7} aria-hidden />
                    {t.vsl.fullscreen}
                  </button>
                </div>

                <span
                  aria-hidden
                  className="bg-canvas/15 absolute inset-x-0 bottom-0 h-px"
                >
                  <span
                    ref={barRef}
                    className="bg-gold absolute inset-0 origin-left"
                    style={{ transform: "scaleX(0)" } as CSSProperties}
                  />
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-start pt-14 md:pt-6">
              <RevealWords
                as="h2"
                text={t.vsl.title}
                delay={0.08}
                className="font-display vsl-ink block max-w-4xl text-center text-[clamp(1.5rem,4.2vw,3.25rem)] leading-[1.04] font-medium tracking-[-0.03em]"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={splitRef}
        aria-hidden
        className="vsl-split pointer-events-none relative z-2"
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <span className="vsl-leaf vsl-leaf-top" />
          <span className="vsl-leaf vsl-leaf-bottom" />
        </div>
      </div>
    </section>
  );
}
