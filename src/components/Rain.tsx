import React, { useMemo } from 'react';

type Drop = {
  left: number;
  delay: number;
  duration: number;
  width: number;
  opacity: number;
  height: number;
};

export default function Rain({ count = 45 }: { count?: number }) {
  // 只在初次渲染生成随机参数
  const drops: Drop[] = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      return {
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 3 + 2.8,
        width: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.5 + 0.2,
        height: Math.random() * 25 + 15 // vh
      };
    });
  }, [count]);

  return (
    <div className="rain-container">
      {drops.map((d, i) => (
        <span
          key={i}
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            width: `${d.width}px`,
            height: `${d.height}vh`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            zIndex: 0
          }}
        />
      ))}
    </div>
  );
}
