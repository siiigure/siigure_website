'use client';
import React from 'react';

interface HomeNavProps {
  children?: React.ReactNode;
  activeId?: string;
  onChange?: (id: string) => void;
}

const items = [
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'photos', label: 'Photos' },
  { id: 'more', label: 'More' }
];

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
              onClick={() => onChange?.(it.id)}
            >
              {it.label}
              <span className="underline" />
            </a>
          );
        })}
      </nav>

      <div style={{ flex: 1 }}>{children}</div>

      <style jsx>{`
        /* 统一定义变量，方便你未来调数值 */
        :root {
          --underline-active: 80%;
          --underline-short: 2.2rem;
        }

        /* ========== 大屏（默认） ========== */
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
          padding-bottom: 0.5rem;
          position: relative;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.18s ease;
        }

        .nav-item .underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background-color: #fff;
          border-radius: 9999px;
          opacity: 1;
          width: 2rem;
        }

        .nav-item.active .underline {
          width: var(--underline-active);
        }

        .nav-item:not(.active) .underline {
          width: var(--underline-short);
        }

        .nav-item:not(.active):hover .underline {
          width: var(--underline-active); /* 强制与 active 一样长 */
        }

        .nav-item:hover {
          transform: translateX(6px);
        }

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
            overflow-x: unset;
          }

          .nav-item {
            font-size: 0.9rem;
            padding: 0.25rem 0.3rem;
            white-space: nowrap;
            transform: none !important;
            flex: 1;
            text-align: center;
          }

          /* 手机：只显示 active 下划线，不随悬停变化 */

          .nav-item.active .underline {
            display: block;
            width: 58%; /* active 下划线固定长度 */
            height: 3px;
          }
        }
      `}</style>
    </section>
  );
}
