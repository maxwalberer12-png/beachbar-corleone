'use client';

import React from 'react';

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
  const content = (
    <>
      {/* Dynamic Light Sweep Shimmer Effect on Hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out pointer-events-none" />

      {/* Icon with Spring Micro-Motion */}
      {icon && (
        <span className="relative z-10 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          {icon}
        </span>
      )}

      {/* Clean, Sharp Typography */}
      <span className={`relative z-10 font-bold transition-colors duration-300 ${hoverColor}`}>
        {label}
      </span>
    </>
  );

  const baseClasses = `group relative overflow-hidden inline-flex items-center justify-center gap-2.5 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer select-none ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel || label}
        className={baseClasses}
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
      aria-label={ariaLabel || label}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
