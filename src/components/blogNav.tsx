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
  // { id: 'blog2', text: 'Blog 2', date: 'March 7, 2025' },
  // { id: 'blog3', text: 'Blog 3', date: 'April 22, 2025' },
  // { id: 'blog4', text: 'Blog 4', date: 'June 9, 2025' }
];

export default function BlogNav({ headings }: BlogNavProps) {
  // 确保依赖稳定
  const headingsToUse = useMemo(() => headings ?? DEFAULT_HEADINGS, [headings]);
  const [activeId, setActiveId] = useState<string>('');
  const rafRef = useRef<number | null>(null);

  // 监听滚动并更新当前激活项
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
    <section className="blog-nav-section max-w-[720rem] mx-auto">
      <p className="text-[19rem] text-gray-300 mb-[72rem]">
        These are things I jot down casually: tech, creativity, and the
        occasional thought. There's no set format — if my words reach you, it's
        as if I'm standing here in front of you.
      </p>

      <nav
        className="blog-nav w-full flex flex-col divide-y divide-transparent"
        aria-label="Blog navigation"
      >
        {headingsToUse.map((h) => {
          const isActive = activeId === h.id;
          return (
            <Link
              key={h.id}
              href={`/blog/${h.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`group flex items-center justify-between w-full  transition-all duration-500
                ${
                  isActive
                    ? 'text-pink-200'
                    : 'text-gray-400 hover:text-pink-200'
                }
              `}
            >
              {/* 左侧标题 + 日期 */}
              <div className="flex-1 flex items-baseline justify-between pr-[40rem]">
                <span
                  className={`text-[32rem] md:text-[40rem] font-semibold tracking-wide transition-all duration-400
                    ${isActive ? 'text-pink-200' : 'text-pink-100'}
                  `}
                >
                  {h.text}
                </span>
                <span
                  className={`text-[20rem] ml-[24rem] whitespace-nowrap transition-all duration-400
                    ${isActive ? 'text-gray-300' : 'text-gray-400'}
                  `}
                >
                  {h.date}
                </span>
              </div>

              {/* 右箭头（靠右对齐） */}
              {/* 右箭头（靠右对齐 + 响应式缩放） */}
              <svg
                className={`opacity-60 transform transition-all duration-500
    ${
      isActive
        ? 'translate-x-[6rem] opacity-100'
        : 'group-hover:translate-x-[6rem] group-hover:opacity-100'
    }
    w-[40rem] h-[40rem] sm:w-[48rem] sm:h-[48rem] md:w-[56rem] md:h-[56rem] lg:w-[64rem] lg:h-[64rem]
  `}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 6L20 12L14 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
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
