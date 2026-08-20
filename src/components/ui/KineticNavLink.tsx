'use client';

import React, { useState } from 'react';
import KineticText from '@/components/ui/KineticText';

interface KineticNavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
  activeColor?: string;
}

export default function KineticNavLink({
  href,
  label,
  onClick,
  className = '',
  activeColor = 'text-amber-400',
}: KineticNavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center text-xs font-mono font-bold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${className}`}
    >
      <KineticText
        text={label}
        isHovered={isHovered}
        hoverColor={activeColor}
        className="py-1"
        staggerMs={20}
      />

      {/* Subtle Glowing Dot Indicator on Hover */}
      <span
        className={`ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 transition-all duration-300 ${
          isHovered ? 'scale-100 opacity-100 shadow-[0_0_8px_#f59e0b]' : 'scale-0 opacity-0'
        }`}
      />
    </a>
  );
}
