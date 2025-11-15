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

  useEffect(() => {
    libRef.current = scrollRef.current!;
  });

  useScrollSnap({ ref: libRef, duration: 150 });

  // 处理除第一个以外的子元素
  const wrappedChildren = React.Children.map(children, (child, i) => {
    if (i === 0) return null; // 第一个我们单独处理
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

  return (
    <div
      ref={scrollRef}
      className={`h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar bg-main-gradient ${
        className ?? ''
      }`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* 单独处理第一个 section，加 padding-top */}
      <div
        key="first"
        className="h-screen snap-start"
        style={{ paddingTop: '6px' }} // 根据文字被吃掉的高度调整
      >
        {React.Children.toArray(children)[0]}
      </div>

      {/* 其余子元素 */}
      {wrappedChildren}
    </div>
  );
}
