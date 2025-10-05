'use client';

import React from 'react';

interface QuadrantTooltipProps {
  quadrant: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
}

const quadrantNames = {
  1: 'Personal Stability',
  2: 'Personal Disruption',
  3: 'Systemic Stability',
  4: 'Systemic Volatility',
};

export default function QuadrantTooltip({ quadrant, children }: QuadrantTooltipProps) {
  const name = quadrantNames[quadrant];
  const displayText = children || `Q${quadrant}`;

  return (
    <span className="relative inline-block group">
      <span className="cursor-help border-b border-dotted border-current">
        {displayText}
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
        {name}
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-popover"></span>
      </span>
    </span>
  );
}
