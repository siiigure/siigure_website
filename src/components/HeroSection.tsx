// src/components/HeroSection.tsx
import { useCallback, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { loadFull } from 'tsparticles';

// ⚠️ 动态导入并禁用 SSR
const Particles = dynamic(() => import('@tsparticles/react'), { ssr: false });

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function HeroSection({
  title,
  subtitle,
  children
}: HeroSectionProps) {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 粒子背景 */}
      {/* @ts-ignore */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: '#0000' },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              resize: true
            }
          },
          particles: {
            color: { value: '#0D7E9C' },
            links: { enable: true, color: '#0D7E9C', distance: 120 },
            move: { enable: true, speed: 1, outModes: { default: 'bounce' } },
            number: { value: 30, density: { enable: true, area: 800 } },
            opacity: { value: 0.6 },
            size: { value: 3 }
          }
        }}
        className="absolute inset-0 z-0"
      />

      {/* 内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-6">
        <h1 className="text-5xl font-bold">{title}</h1>
        {subtitle && <p className="text-lg">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
