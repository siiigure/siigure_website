'use client';

import { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const parseInlineContent = (text: string) => {
  const regex = /(\[[^\]]+\]\([^)]+\))|(\$[^\$]+\$)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    if (part.startsWith('[') && part.includes('](')) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        return (
          <a
            key={index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', textDecoration: 'underline' }}
            className="hover:opacity-80"
          >
            {match[1]}
          </a>
        );
      }
    }

    if (part.startsWith('$') && part.endsWith('$')) {
      return <InlineMath key={index} math={part.slice(1, -1)} />;
    }

    return part;
  });
};

const PercolationArticleContent = ({ content }: { content: string }) => {
  const blocks = content.split(/```/g);

  return (
    <article className="prose prose-lg dark:prose-invert max-w-[800px] mx-auto leading-[1.9]">
      {blocks.map((block, blockIndex) => {
        const isCode = blockIndex % 2 === 1;

        if (isCode) {
          return (
            <div
              key={blockIndex}
              style={{
                margin: '40px 0',
                position: 'relative'
              }}
            >
              <div
                style={{
                  background: 'rgba(10, 25, 47, 0.4)',
                  borderRadius: '8px',
                  padding: '16px',
                  overflowX: 'auto',
                  fontFamily: 'Consolas, monospace',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: '#fff',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {block.trim()}
              </div>
            </div>
          );
        }

        const lines = block.split('\n');
        const groupedLines: { type: string; content: string[] | string }[] = [];

        lines.forEach((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('>')) {
            const last = groupedLines[groupedLines.length - 1];
            if (last && last.type === 'quote') {
              (last.content as string[]).push(trimmed.slice(1).trim());
            } else {
              groupedLines.push({
                type: 'quote',
                content: [trimmed.slice(1).trim()]
              });
            }
          } else {
            groupedLines.push({ type: 'normal', content: line });
          }
        });

        return groupedLines.map((group, groupIndex) => {
          const key = `${blockIndex}-${groupIndex}`;

          if (group.type === 'quote') {
            return (
              <blockquote
                key={key}
                style={{
                  borderLeft: '3px solid #fff',
                  paddingLeft: '30px',
                  marginTop: '40px',
                  marginBottom: '40px',
                  marginLeft: '0',
                  marginRight: '0'
                }}
              >
                {(group.content as string[]).map((text, i) => (
                  <p
                    key={i}
                    style={{
                      margin: '0 0 12px 0',
                      color: '#fff',
                      fontSize: 'clamp(1rem, 2.6vw, 1.25rem)',
                      lineHeight: '1.8'
                    }}
                  >
                    {parseInlineContent(text)}
                  </p>
                ))}
              </blockquote>
            );
          }

          const line = group.content as string;
          const trimmed = line.trim();
          if (!trimmed) return <React.Fragment key={key} />;

          const isPartHeading = /^PART\s*\d+$/i.test(trimmed);
          const showDivider = isPartHeading && groupIndex !== 0;
          const isH2 = trimmed.startsWith('## ');
          const isH3 = trimmed.startsWith('### ');
          const isDivider = trimmed === '---';
          const isImage = trimmed.startsWith('![');

          const parseImages = (text: string) => {
            const images = Array.from(
              text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)
            );
            if (images.length === 0) return null;

            const result: React.ReactNode[] = [];
            for (let i = 0; i < images.length; i += 2) {
              const first = images[i];
              const second = images[i + 1];

              if (second) {
                result.push(
                  <div key={`img-group-${i}`} className="flex gap-4 my-4">
                    <img
                      src={first[2]}
                      alt={first[1]}
                      className="w-1/2 h-auto rounded-md"
                    />
                    <img
                      src={second[2]}
                      alt={second[1]}
                      className="w-1/2 h-auto rounded-md"
                    />
                  </div>
                );
              } else {
                result.push(
                  <img
                    key={`img-single-${i}`}
                    src={first[2]}
                    alt={first[1]}
                    className="w-[90%] h-auto block mx-auto my-8 rounded-lg shadow-sm"
                  />
                );
              }
            }
            return result;
          };

          return (
            <React.Fragment key={key}>
              {showDivider && (
                <hr className="border-gray-700 w-[80%] mx-auto my-[72px]" />
              )}
              {isDivider && <hr className="my-12" />}
              {isImage && parseImages(trimmed)}
              {isH2 && (
                <h2 className="text-[34px] md:text-[42px] font-semibold text-pink-200 tracking-wide mt-[80px] mb-[32px]">
                  {parseInlineContent(trimmed.slice(3))}
                </h2>
              )}
              {isH3 && (
                <h3 className="text-[26px] md:text-[32px] font-semibold text-pink-100 tracking-wide mt-[64px] mb-[24px]">
                  {parseInlineContent(trimmed.slice(4))}
                </h3>
              )}
              {!isH2 &&
                !isH3 &&
                group.type !== 'quote' &&
                !isDivider &&
                !isPartHeading &&
                !isImage && (
                  <p
                    className="text-gray-100 font-normal leading-[1.9] whitespace-pre-line"
                    style={{ fontSize: 'clamp(1rem, 2.6vw, 1.35rem)' }}
                  >
                    {parseInlineContent(line)}
                  </p>
                )}
              {isPartHeading && (
                <h2 className="text-[34px] md:text-[42px] font-semibold text-blue-200 tracking-wide mt-[80px] mb-[32px]">
                  {trimmed}
                </h2>
              )}
            </React.Fragment>
          );
        });
      })}
    </article>
  );
};

export default function Blog1Page() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/texts/percolation.txt')
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <main>
      <header className="mb-[150px] text-right relative max-w-[800px] mx-auto">
        <h1
          className="font-bold text-pink-200 tracking-wide mb-[16px]"
          style={{ fontSize: 'clamp(3rem, 7vw, 4.6rem)' }}
        >
          Princeton Algorithms: Percolation Project Reflection
        </h1>

        <div
          className="text-gray-400"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
        >
          HuaiAn · Spring
        </div>

        <div
          className="text-gray-500 mt-[8px]"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}
        >
          April 2, 2025
        </div>
      </header>

      {content ? (
        <PercolationArticleContent content={content} />
      ) : (
        <div className="text-gray-400 text-center max-w-[800px] mx-auto">
          Loading content...
        </div>
      )}

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
            xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
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
