'use client';

import { useRef, useEffect, CSSProperties } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: CSSProperties;
}

export default function FadingVideo({ src, className = '', style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sourceIndex = useRef(0);
  const sources = Array.isArray(src) ? src : [src];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeInRaf: number | null = null;
    let fadeOutRaf: number | null = null;

    const fadeIn = () => {
      if (fadeInRaf) cancelAnimationFrame(fadeInRaf);
      const start = performance.now();
      const duration = 500;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        video.style.opacity = String(t);
        if (t < 1) fadeInRaf = requestAnimationFrame(tick);
      };
      fadeInRaf = requestAnimationFrame(tick);
    };

    const fadeOut = (durationMs: number) => {
      if (fadeOutRaf) cancelAnimationFrame(fadeOutRaf);
      const start = performance.now();
      const startOpacity = parseFloat(video.style.opacity || '1');
      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        video.style.opacity = String(startOpacity * (1 - t));
        if (t < 1) fadeOutRaf = requestAnimationFrame(tick);
      };
      fadeOutRaf = requestAnimationFrame(tick);
    };

    const handleLoadedData = () => {
      fadeIn();
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && parseFloat(video.style.opacity || '1') > 0.01) {
        fadeOut(550);
      }
    };

    const handleEnded = () => {
      if (sources.length === 1) {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadeIn();
      } else {
        sourceIndex.current = (sourceIndex.current + 1) % sources.length;
        video.src = sources[sourceIndex.current];
        video.load();
        video.play().catch(() => {});
      }
    };

    video.style.opacity = '0';
    video.src = sources[sourceIndex.current];
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (fadeInRaf) cancelAnimationFrame(fadeInRaf);
      if (fadeOutRaf) cancelAnimationFrame(fadeOutRaf);
      if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
