'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CipherNavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
  activeColor?: string;
}

const CIPHER_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦◈☼≋◊';

export default function CipherNavLink({
  href,
  label,
  onClick,
  className = '',
  activeColor = 'text-amber-400',
}: CipherNavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [scrambled, setScrambled] = useState(label);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setScrambled(label);
  }, [label]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setScrambled(
        label
          .split('')
          .map((char, idx) => {
            if (char === ' ' || char === '•') return char;
            if (idx < iteration) {
              return label[idx];
            }
            return CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= label.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setScrambled(label);
      }

      iteration += 1 / 2;
    }, 28);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setScrambled(label);
  };

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center text-xs font-mono font-bold tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer ${className}`}
    >
      <span className="relative inline-flex overflow-hidden py-1">
        {label.split('').map((char, index) => {
          const currentChar = scrambled[index] || char;
          return (
            <span
              key={index}
              className="inline-block relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transitionDelay: `${index * 20}ms`,
              }}
            >
              {/* Primary Rolling Character */}
              <span
                className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isHovered ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100 text-stone-300'
                }`}
              >
                {char === ' ' ? '\u00A0' : currentChar}
              </span>

              {/* Duplicate Arriving Character (Hover State) */}
              <span
                className={`absolute inset-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeColor} ${
                  isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                {char === ' ' ? '\u00A0' : currentChar}
              </span>
            </span>
          );
        })}
      </span>

      {/* Subtle Glowing Indicator Dot on Hover */}
      <span
        className={`ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 transition-all duration-300 ${
          isHovered ? 'scale-100 opacity-100 shadow-[0_0_8px_#f59e0b]' : 'scale-0 opacity-0'
        }`}
      />
    </a>
  );
}
