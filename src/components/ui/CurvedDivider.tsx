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
        viewBox="0 0 1440 90"
        fill={fillColor}
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 lg:h-24 block drop-shadow-[0_-12px_25px_rgba(0,0,0,0.8)]"
      >
        {/* Harmonious Arched Dome Curve */}
        <path d="M0,90 C400,0 1040,0 1440,90 L1440,90 L0,90 Z" />
      </svg>
    </div>
  );
}
