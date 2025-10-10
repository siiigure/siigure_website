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
  // 真实用于绑定到 DOM 的 ref（可能为 null）
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // 传给库的 ref：类型为 RefObject<HTMLElement>（使用非空断言初始化以匹配库类型）
  const libRef = useRef<HTMLElement>(null!);

  // 在渲染后同步真实 DOM 到库用的 ref（安全、简单）
  useEffect(() => {
    libRef.current = scrollRef.current!;
  });

  // 只传入库类型定义支持的属性（例如 duration），不要传 delay
  useScrollSnap({ ref: libRef, duration: 150 });

  // 为每个直接子节点注入 snap 类（若子节点已有 class 会合并）
  const wrappedChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      const existing =
        (child.props as React.HTMLProps<HTMLElement>).className || '';
      const added = `${existing} snap-start h-screen`.trim();
      return React.cloneElement(child, {
        key: child.key ?? `snap-${i}`,
        className: added
      } as React.HTMLProps<HTMLElement>);
    }
    // 非 React 元素的子节点包一层
    return (
      <div key={`snap-${i}`} className="snap-start h-screen">
        {child}
      </div>
    );
  });

  return (
    <div
      ref={scrollRef}
      className={`h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar ${
        className ?? ''
      }`}
      style={{ WebkitOverflowScrolling: 'touch' }} // 保持移动端平滑滚动
    >
      {wrappedChildren}
    </div>
  );
}
