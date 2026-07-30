'use client';

import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-container text-white relative min-h-screen w-screen overflow-x-hidden">
      {children}
    </div>
  );
}
