'use client';
import React from 'react';

// === Component Types ===
interface HomeNavProps {
  children?: React.ReactNode;
  activeId?: string;
  onChange?: (id: string) => void;
}

// === Navigation Items ===
const items = [
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'photos', label: 'Photos' },
  { id: 'more', label: 'More' }
];

// === Component ===
export default function HomeNav({
  children,
  activeId,
  onChange
}: HomeNavProps) {
  return (
    <section className="home-nav-section">
      {/* === Navigation === */}
      <nav className="home-nav">
        {items.map((it) => {
          const isActive = it.id === activeId;

          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                const target = document.getElementById(it.id);
                if (target) {
                  e.preventDefault();
                  onChange?.(it.id);
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {it.label}
              <span className="underline" />
            </a>
          );
        })}
      </nav>

      {/* === Content Slot === */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* === Styles === */}
      <style jsx>{`
        :global(:root) {
          --underline-active: 4.4rem;
          --underline-short: 3.2rem;
        }

        /* === Desktop Layout === */
        section.home-nav-section {
          display: flex;
          flex-direction: row;
          gap: 3rem;
          width: 100%;
        }

        .home-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 220px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          font-weight: 500;
          color: #fff;
          padding-bottom: 0.6rem;
          position: relative;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.18s ease;
        }

        .nav-item .underline {
          position: absolute;
          left: 0;
          bottom: 0.18rem;
          height: 4px;
          background-color: #fff;
          border-radius: 9999px;
          width: var(--underline-short);
          transition: width 0.22s ease;
          display: block;
        }

        .nav-item:not(.active) .underline {
          width: var(--underline-short);
        }

        .nav-item.active .underline {
          width: var(--underline-active);
        }

        .nav-item:not(.active):hover .underline {
          width: var(--underline-active);
        }

        .nav-item:hover {
          transform: translateX(6px);
        }

        /* === Mobile Layout === */
        @media (max-width: 767px) {
          section.home-nav-section {
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 0.5rem;
            width: 100%;
          }

          .home-nav {
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            gap: 0.5rem;
            max-width: none !important;
          }

          .nav-item {
            font-size: 0.9rem;
            padding: 0.25rem 0.3rem 0.45rem;
            white-space: nowrap;
            transform: none !important;
            flex: 1;
            text-align: center;
          }

          .nav-item .underline {
            display: none;
          }

          .nav-item.active .underline {
            display: block;
            width: fit-content;
            min-width: 50%;
            height: 3px;
            bottom: 0.18rem;
            margin: auto;
            right: 90px;
          }
        }
      `}</style>
    </section>
  );
}
