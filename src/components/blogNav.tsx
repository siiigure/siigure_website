'use client';

import Link from 'next/link';
import { useEffect, useState, useRef, useMemo } from 'react';

type Heading = {
  id: string;
  text: string;
  date: string;
};

interface BlogNavProps {
  headings?: Heading[];
}

const DEFAULT_HEADINGS: Heading[] = [
  { id: 'blog1', text: '京都小住随记', date: 'August 13, 2025' }
];

export default function BlogNav({ headings }: BlogNavProps) {
  const headingsToUse = useMemo(() => headings ?? DEFAULT_HEADINGS, [headings]);
  const [activeId, setActiveId] = useState<string>('');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateActive = () => {
      let current = '';
      for (const h of headingsToUse) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = h.id;
      }
      setActiveId(current);
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [headingsToUse]);

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <p className="text-lg text-gray-400 mb-16">
        These are things I jot down casually: tech, creativity, and the
        occasional thought. There's no set format — if my words reach you, it's
        as if I'm standing here in front of you.
      </p>

      <nav
        className="flex flex-col divide-y divide-transparent"
        aria-label="Blog navigation"
      >
        {headingsToUse.map((h) => {
          const isActive = activeId === h.id;
          return (
            <Link
              key={h.id}
              href={`/blog/${h.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`
                group flex items-center justify-between w-full py-4 transition-colors duration-300
                ${
                  isActive
                    ? 'text-pink-400'
                    : 'text-gray-400 hover:text-pink-400'
                }
              `}
            >
              {/* 左侧标题和日期 */}
              <div className="flex-1 flex items-baseline justify-between pr-10">
                <span
                  className={`text-xl md:text-2xl font-semibold transition-colors duration-300
                    ${isActive ? 'text-pink-400' : 'text-pink-200'}
                  `}
                >
                  {h.text}
                </span>
                <span
                  className={`text-sm ml-6 whitespace-nowrap transition-colors duration-300
                    ${isActive ? 'text-gray-300' : 'text-gray-400'}
                  `}
                >
                  {h.date}
                </span>
              </div>

              {/* 右箭头 */}
              <svg
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 opacity-60 transform transition-all duration-300
                  ${
                    isActive
                      ? 'translate-x-1 opacity-100'
                      : 'group-hover:translate-x-1 group-hover:opacity-100'
                  }
                `}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 6L20 12L14 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
