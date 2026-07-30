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
  { id: 'photos', label: 'Polaroid' },
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
              <span aria-hidden="true">{isActive ? '[*]' : '[ ]'}</span>
              <span>{it.label}</span>
            </a>
          );
        })}
      </nav>

      {/* === Content Slot === */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* === Styles === */}
      <style jsx>{`
        section.home-nav-section {
          display: flex;
          width: fit-content;
        }

        .home-nav {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(0.7rem, 2.2vw, 1.2rem);
          max-width: min(92vw, 34rem);
          overflow-x: auto;
          padding: 0.15rem 0;
        }

        .nav-item {
          display: inline-flex;
          align-items: center;
          gap: 0.42rem;
          flex: 0 0 auto;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.72);
          padding: 0.12rem 0;
          position: relative;
          cursor: pointer;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0;
          line-height: 1.35;
          transition:
            color 0.18s ease,
            opacity 0.18s ease;
        }

        .nav-item:hover,
        .nav-item.active {
          color: #fff;
          opacity: 1;
        }

        @media (max-width: 900px) {
          section.home-nav-section {
            margin-top: 0;
            width: 100%;
          }

          .home-nav {
            justify-content: flex-start;
            width: 100%;
            max-width: none !important;
            gap: 0.72rem;
          }

          .nav-item {
            flex: 0 0 auto;
            font-size: 0.78rem;
            padding: 0.18rem 0;
            white-space: nowrap;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
