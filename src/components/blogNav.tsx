'use client';
import { useMemo, useState, useEffect } from 'react';

type Heading = {
  id: string;
  text: string;
  date: string;
};

interface BlogNavProps {
  headings?: Heading[];
}

const DEFAULT_HEADINGS: Heading[] = [
  { id: 'KyotoDiary', text: '京都小住随记', date: 'August 13, 2025' },
  {
    id: 'Percolation',
    text: 'Princeton Algorithms: Percolation Project Reflection',
    date: ' April 2, 2025'
  }
];

export default function BlogNav({ headings }: BlogNavProps) {
  const headingsToUse = useMemo(() => headings ?? DEFAULT_HEADINGS, [headings]);

  // Dynamic margin for mobile screens
  const [marginTop, setMarginTop] = useState('6rem');

  useEffect(() => {
    const updateMargin = () => {
      setMarginTop(window.innerWidth <= 700 ? '2rem' : '6rem');
    };
    updateMargin(); // initial check
    window.addEventListener('resize', updateMargin);
    return () => window.removeEventListener('resize', updateMargin);
  }, []);

  return (
    <section className="mt-24 md:mt-32 lg:mt-40 w-full max-w-screen-xl mx-auto flex flex-col items-start mb-4 md:mb-[8rem]">
      {/* Introductory text */}
      <p
        className="mb-4 md:mb-6 text-gray-300"
        style={{
          fontSize: '1.2rem',
          lineHeight: 1.6,
          marginTop,
          maxWidth: '900px'
        }}
      >
        These are things I jot down casually: tech, creativity, and the
        occasional thought.
      </p>

      {/* Navigation list */}
      <nav
        style={{
          width: '60vw',
          marginLeft: 'calc(65% - 50vw)',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '3rem',
          marginTop: '4rem'
        }}
        aria-label="Blog navigation"
      >
        {headingsToUse.map((h) => (
          <a
            key={h.id}
            href={`/blog/${h.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '1rem 2rem',
              color: '#e5e7eb',
              textDecoration: 'none',
              transition: 'color 0.3s, transform 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f9d2e4')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#e5e7eb')}
          >
            {/* Text container */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 'calc(100% - 60px)'
              }}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {h.text}
              </span>
              <span
                style={{
                  fontSize: '0.875rem',
                  marginTop: '0.25rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {h.date}
              </span>
            </div>

            {/* Arrow icon */}
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              aria-hidden="true"
              style={{
                transition: 'transform 0.3s',
                fill: 'none',
                stroke: 'currentColor'
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'translateX(4px)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'translateX(0)')
              }
            >
              <path
                d="M4 12H20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 6L20 12L14 18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </nav>
    </section>
  );
}
