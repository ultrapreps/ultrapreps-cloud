'use client';

import React from 'react';

interface HighlightTextProps {
  children: string;
  className?: string;
  highlightClass?: string;
}

/**
 * Component to render text with **highlighted** portions
 * Converts **text** to <strong> elements with custom styling
 */
export default function HighlightText({ 
  children, 
  className = '', 
  highlightClass = 'text-yellow-400 font-bold' 
}: HighlightTextProps) {
  
  // Parse text and convert **text** to highlighted spans
  const parseHighlights = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** markers and apply highlight styling
        const highlightedText = part.slice(2, -2);
        return (
          <strong key={index} className={highlightClass}>
            {highlightedText}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <span className={className}>
      {parseHighlights(children)}
    </span>
  );
}

// Utility function for quick inline highlighting
export function highlight(text: string, highlightClass = 'text-yellow-400 font-bold') {
  return <HighlightText highlightClass={highlightClass}>{text}</HighlightText>;
}

// Pre-configured highlight variants
export const GoldHighlight = ({ children }: { children: string }) => (
  <HighlightText highlightClass="text-yellow-400 font-bold">{children}</HighlightText>
);

export const BlueHighlight = ({ children }: { children: string }) => (
  <HighlightText highlightClass="text-blue-400 font-bold">{children}</HighlightText>
);

export const GreenHighlight = ({ children }: { children: string }) => (
  <HighlightText highlightClass="text-green-400 font-bold">{children}</HighlightText>
);

export const RedHighlight = ({ children }: { children: string }) => (
  <HighlightText highlightClass="text-red-400 font-bold">{children}</HighlightText>
);

export const PurpleHighlight = ({ children }: { children: string }) => (
  <HighlightText highlightClass="text-purple-400 font-bold">{children}</HighlightText>
);