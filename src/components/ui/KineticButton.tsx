'use client';

import React, { useState } from 'react';
import KineticText from '@/components/ui/KineticText';

interface KineticButtonProps {
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  hoverColor?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function KineticButton({
  label,
  href,
  target,
  rel,
  onClick,
  icon,
  className = '',
  hoverColor = '',
  ariaLabel,
  type = 'button',
  disabled = false,
}: KineticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <>
      {icon && (
        <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      )}
      <KineticText
        text={label}
        isHovered={isHovered}
        hoverColor={hoverColor}
        staggerMs={16}
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={ariaLabel || label}
        className={`group inline-flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel || label}
      className={`group inline-flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${className}`}
    >
      {content}
    </button>
  );
}
