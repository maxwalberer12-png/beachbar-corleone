'use client';

import React, { useState, useEffect, useRef } from 'react';

interface KineticTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
  hoverColor?: string;
  staggerMs?: number;
}

const GLYPH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦◈☼≋◊';

export default function KineticText({
  text,
  isHovered,
  className = '',
  hoverColor = '',
  staggerMs = 18,
}: KineticTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      let iteration = 0;

      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, idx) => {
              if (char === ' ' || char === '•' || char === '&' || char === '-') return char;
              if (idx < iteration) {
                return text[idx];
              }
              return GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(text);
        }

        iteration += 1 / 2;
      }, 26);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(text);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text]);

  return (
    <span className={`inline-flex items-center overflow-hidden leading-tight ${className}`}>
      {text.split('').map((char, index) => {
        const currentChar = displayText[index] || char;
        return (
          <span
            key={index}
            className="inline-block relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              transitionDelay: `${index * staggerMs}ms`,
            }}
          >
            {/* Base Character (Slides up on hover) */}
            <span
              className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isHovered ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              {char === ' ' ? '\u00A0' : currentChar}
            </span>

            {/* Arriving Duplicate Character (Slides into view on hover) */}
            <span
              className={`absolute inset-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${hoverColor} ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              {char === ' ' ? '\u00A0' : currentChar}
            </span>
          </span>
        );
      })}
    </span>
  );
}
