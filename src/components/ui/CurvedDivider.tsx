'use client';

import React from 'react';

interface CurvedDividerProps {
  fillColor?: string;
  className?: string;
}

export default function CurvedDivider({ fillColor = '#0C121A', className = '' }: CurvedDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill={fillColor}
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-24 md:h-32 lg:h-36 block drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
      >
        {/* Continuous Halbrunde Kuppel / Majestic Arched Dome */}
        <path d="M0,120 C360,10 1080,10 1440,120 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}
