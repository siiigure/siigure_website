import React from 'react';
import { InlineMath } from 'react-katex';

function parseInlineContent(text: string) {
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
            className="blog-inline-link"
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
}

function parseImages(text: string) {
  const images = Array.from(text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g));
  if (images.length === 0) return null;

  const rows: React.ReactNode[] = [];
  for (let i = 0; i < images.length; i += 2) {
    const first = images[i];
    const second = images[i + 1];

    rows.push(
      <div
        key={`img-row-${i}`}
        className={`blog-image-row ${second ? 'two-up' : ''}`}
      >
        <img src={first[2]} alt={first[1]} />
        {second && <img src={second[2]} alt={second[1]} />}
      </div>
    );
  }

  return rows;
}

export default function BlogArticleRenderer({ content }: { content: string }) {
  const blocks = content.split(/```/g);

  return (
    <article className="blog-article">
      {blocks.map((block, blockIndex) => {
        const isCode = blockIndex % 2 === 1;

        if (isCode) {
          return (
            <pre key={blockIndex} className="blog-code">
              <code>{block.trim()}</code>
            </pre>
          );
        }

        const lines = block.split('\n');
        const groupedLines: { type: 'quote' | 'normal'; content: string[] | string }[] = [];

        lines.forEach((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('>')) {
            const last = groupedLines[groupedLines.length - 1];
            if (last?.type === 'quote') {
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
              <blockquote key={key} className="blog-quote">
                {(group.content as string[]).map((text, index) => (
                  <p key={index}>{parseInlineContent(text)}</p>
                ))}
              </blockquote>
            );
          }

          const line = group.content as string;
          const trimmed = line.trim();
          if (!trimmed) return <React.Fragment key={key} />;

          const images = parseImages(trimmed);
          const isPartHeading = /^PART\s*\d+$/i.test(trimmed);
          const isChineseHeading = /^[一二三四五六七八九十]+$/.test(trimmed);

          if (images) return <React.Fragment key={key}>{images}</React.Fragment>;
          if (trimmed.startsWith('## ')) {
            return <h2 key={key}>{parseInlineContent(trimmed.slice(3))}</h2>;
          }
          if (trimmed.startsWith('### ')) {
            return <h3 key={key}>{parseInlineContent(trimmed.slice(4))}</h3>;
          }
          if (trimmed === '---') return <hr key={key} />;
          if (isPartHeading || isChineseHeading) {
            return (
              <React.Fragment key={key}>
                {groupIndex !== 0 && <hr className="blog-section-rule" />}
                <h2>{trimmed}</h2>
              </React.Fragment>
            );
          }

          return <p key={key}>{parseInlineContent(line)}</p>;
        });
      })}
    </article>
  );
}
