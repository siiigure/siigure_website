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
      {/* 标题区域 */}
      <header className="mb-[180rem] text-right relative">
        <h1 className="text-[64rem] md:text-[88rem] font-bold text-pink-200 tracking-wide mb-[16rem]">
          京都小住随记
        </h1>
        <div className="text-[24rem] text-gray-400">Kyoto · Winter</div>
        <div className="text-[16rem] text-gray-500 mt-[8rem]">
          August 13, 2025
        </div>
      </header>

      {/* 正文区域 */}
      <article className="max-w-[800rem] mx-auto space-y-[48rem]">
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
                <hr className="border-gray-700 w-[80rem] mx-auto my-[72rem]" />
              )}
              {isHeading ? (
                <h2 className="text-[32rem] md:text-[40rem] font-semibold mt-[80rem] mb-[32rem] text-pink-200 tracking-wide">
                  {line.trim()}
                </h2>
              ) : isQuote ? (
                <blockquote className="text-[22rem] text-gray-300 italic border-l-[4rem] border-pink-400 pl-[24rem] my-[32rem]">
                  {line.trim()}
                </blockquote>
              ) : (
                <p className="text-[20rem] text-gray-100 whitespace-pre-line font-normal">
                  {line.trim()}
                </p>
              )}
            </div>
          );
        })}
      </article>

      {/* 底部箭头区域：更接近正文、底部留距更大、颜色跟文本一致并 hover 左移 */}
      <div className="mt-[80rem] mb-[200rem] flex justify-start max-w-[800rem] mx-auto">
        <Link
          href="/#blog"
          aria-label="Back to Blog"
          className="group inline-flex items-center text-[#e5e7eb] hover:text-[#f9d2e4] transition-colors duration-500"
        >
          {/* inline SVG：stroke 使用 currentColor（跟随父元素 color） */}
          <svg
            className="w-[56rem] h-[56rem] opacity-60 group-hover:opacity-100 transform transition-transform duration-500 group-hover:-translate-x-[6rem]"
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
