'use client';

import React, { useState, useEffect, useRef } from 'react';
import HeroIris from './HeroIris';
import HorizontalTimelapse from './HorizontalTimelapse';
import { Language } from '@/lib/types';

interface CinematicCanvasProps {
  lang: Language;
}

export default function CinematicCanvas({ lang }: CinematicCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split the progress:
  // 0% - 25%: Iris Hero Dive (HeroIris progress 0 -> 1)
  // 25% - 100%: Horizontal Timelapse (HorizontalTimelapse progress 0 -> 1)
  const isIrisStage = scrollProgress < 0.25;
  const irisProgress = Math.min(1, scrollProgress / 0.25);
  const timelapseProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.75));

  return (
    <div ref={containerRef} className="relative w-full h-[350vh] bg-black">
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isIrisStage ? (
          <HeroIris lang={lang} scrollProgress={irisProgress} />
        ) : (
          <HorizontalTimelapse lang={lang} progress={timelapseProgress} />
        )}
      </div>
    </div>
  );
}
