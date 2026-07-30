'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Blog1Page() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    fetch('/texts/blog.txt')
      .then((res) => res.text())
      .then((text) =>
        setLines(text.split('\n').filter((line) => line.trim() !== ''))
      );
  }, []);

  return (
    <main>
      {/* HEADER */}
      <header className="mb-[180px] text-right relative">
        <h1
          className="font-bold text-pink-200 tracking-wide mb-[16px]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
        >
          京都小住随记
        </h1>

        <div
          className="text-gray-400"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.6rem)' }}
        >
          Kyoto · Winter
        </div>

        <div
          className="text-gray-500 mt-[8px]"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}
        >
          August 13, 2025
        </div>
      </header>

      {/* TEXT */}
      <article className="max-w-[800px] mx-auto space-y-[48px]">
        {lines.map((line, i) => {
          const isHeading =
            /^[一二三四五六七八九十]+$/.test(line.trim()) ||
            (/[·：:]/.test(line) && line.length <= 15);
          const isQuote = line.startsWith('“') || line.startsWith('"');
          const showDivider =
            line.trim() === '二' ||
            (isHeading && line.trim() !== '一' && lines[i - 1]?.trim() !== '');

          return (
            <div key={i}>
              {showDivider && (
                <hr className="border-gray-700 w-[80%] mx-auto my-[72px]" />
              )}
              {isHeading ? (
                <h2 className="text-[32px] md:text-[40px] font-semibold mt-[80px] mb-[32px] text-pink-200 tracking-wide">
                  {line.trim()}
                </h2>
              ) : isQuote ? (
                <blockquote className="text-[22px] text-gray-300 italic border-l-[4px] border-pink-400 pl-[24px] my-[32px]">
                  {line.trim()}
                </blockquote>
              ) : (
                <p
                  className="text-gray-100 whitespace-pre-line font-normal leading-[1.85]"
                  style={{ fontSize: 'clamp(1rem, 2.6vw, 1.35rem)' }}
                >
                  {line.trim()}
                </p>
              )}
            </div>
          );
        })}
      </article>

      {/* BOTTOM ARROW */}
      <div className="mt-[80px] mb-[200px] flex justify-start max-w-[800px] mx-auto">
        <Link
          href="/#blog"
          aria-label="Back to Blog"
          className="group inline-flex items-center text-[#e5e7eb] hover:text-[#f9d2e4] transition-colors duration-500"
        >
          <svg
            className="w-[56px] h-[56px] opacity-60 group-hover:opacity-100 transform transition-transform duration-500 group-hover:-translate-x-[6px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M20 12H4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6L4 12L10 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
