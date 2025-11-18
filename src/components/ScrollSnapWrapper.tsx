'use client';

import React, { ReactNode, useRef, useEffect } from 'react';
import useScrollSnap from 'react-use-scroll-snap';

interface ScrollSnapWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollSnapWrapper({
  children,
  className
}: ScrollSnapWrapperProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const libRef = useRef<HTMLElement>(null!);

  /* Initialize scroll snap reference */
  useEffect(() => {
    libRef.current = scrollRef.current!;
  });

  useScrollSnap({ ref: libRef, duration: 150 });

  /* Wrap all children except the first for snap behavior */
  const wrappedChildren = React.Children.map(children, (child, i) => {
    if (i === 0) return null;

    if (React.isValidElement(child)) {
      const existing =
        (child.props as React.HTMLProps<HTMLElement>).className || '';
      const added = `${existing} snap-start h-screen`.trim();
      return React.cloneElement(child, {
        key: child.key ?? `snap-${i}`,
        className: added
      } as React.HTMLProps<HTMLElement>);
    }

    return (
      <div key={`snap-${i}`} className="snap-start h-screen">
        {child}
      </div>
    );
  });

  /* Render scrollable container */
  return (
    <div
      ref={scrollRef}
      className={`h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar bg-main-gradient ${
        className ?? ''
      }`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* First child section with padding */}
      <div
        key="first"
        className="h-screen snap-start"
        style={{ paddingTop: '6px' }}
      >
        {React.Children.toArray(children)[0]}
      </div>

      {/* Remaining children with snap behavior */}
      {wrappedChildren}
    </div>
  );
}
