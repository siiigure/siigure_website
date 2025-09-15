import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden
      bg-gradient-to-b from-indigo-600 via-sky-600 to-purple-600 text-white
      selection:bg-white/30 selection:text-black"
    >
      {/* content container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {children}
      </div>
    </div>
  );
}
