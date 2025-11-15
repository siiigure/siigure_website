'use client';
import React, { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 根据宽度设置边距和 maxWidth
  let containerStyle: React.CSSProperties = {
    width: '85%',
    margin: '0 auto',
    maxWidth: '900px'
  };

  if (width >= 1024) {
    containerStyle = {
      ...containerStyle,
      maxWidth: '900px',
      paddingLeft: '12rem',
      paddingRight: '12rem'
    };
  } else if (width >= 768) {
    containerStyle = {
      ...containerStyle,
      maxWidth: '900px',
      paddingLeft: '1rem',
      paddingRight: '1rem'
    };
  } else if (width >= 480) {
    containerStyle = {
      ...containerStyle,
      maxWidth: '700px',
      paddingLeft: '0.2rem',
      paddingRight: '0.2rem'
    };
  }

  return (
    <div className="layout-container text-white relative min-h-screen w-screen overflow-x-hidden">
      <div style={containerStyle}>{children}</div>
    </div>
  );
}
