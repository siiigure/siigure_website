'use client';

import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogNavProps {
  posts: BlogPostMeta[];
}

export default function BlogNav({ posts }: BlogNavProps) {
  return (
    <section className="blog-field-section">
      <div className="field-section-kicker">02 / BLOG</div>
      <div className="blog-field-header">
        <h2>Notes, projects, and small records.</h2>
        <p>
          Things I jot down casually: tech, creativity, and the occasional
          thought.
        </p>
      </div>

      <div className="blog-card-grid">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`blog-pixel-card ${post.theme}`}
          >
            <span className="blog-card-index">
              [{String(index + 1).padStart(2, '0')}]
            </span>
            <span className="blog-card-category">[ ] {post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="blog-card-date">{post.date}</span>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        .blog-field-section {
          width: min(92vw, 1120px);
          min-height: 100vh;
          margin: 0 auto;
          padding: clamp(4.5rem, 10vh, 6.5rem) 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .field-section-kicker {
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .blog-field-header {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr);
          gap: 2rem;
          align-items: end;
          margin-bottom: clamp(2rem, 5vh, 3.5rem);
        }

        .blog-field-header h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 600;
          line-height: 0.96;
        }

        .blog-field-header p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.6;
        }

        .blog-card-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-auto-rows: minmax(10rem, auto);
          gap: 0.65rem;
        }

        .blog-pixel-card {
          position: relative;
          grid-column: span 6;
          min-height: 16rem;
          padding: 1rem;
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background:
            linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            rgba(255, 255, 255, 0.055);
          background-size: 18px 18px;
          overflow: hidden;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background-color 180ms ease,
            color 180ms ease;
        }

        .blog-pixel-card:nth-child(3n + 1) {
          grid-column: span 7;
        }

        .blog-pixel-card:nth-child(3n + 2) {
          grid-column: span 5;
        }

        .blog-pixel-card:hover {
          transform: translateY(-4px);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.45);
          background-color: rgba(255, 255, 255, 0.1);
        }

        .blog-pixel-card.pink:hover {
          box-shadow: inset 0 -4px 0 rgba(255, 216, 234, 0.55);
        }

        .blog-pixel-card.blue:hover {
          box-shadow: inset 0 -4px 0 rgba(216, 236, 255, 0.55);
        }

        .blog-card-index,
        .blog-card-category,
        .blog-card-date {
          display: inline-block;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.84rem;
          text-transform: uppercase;
        }

        .blog-card-category {
          float: right;
        }

        .blog-pixel-card h3 {
          clear: both;
          margin: 3rem 0 1rem;
          color: #fff;
          font-size: clamp(1.45rem, 3vw, 2.4rem);
          font-weight: 600;
          line-height: 1;
        }

        .blog-pixel-card p {
          max-width: 34rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 1rem;
          line-height: 1.55;
        }

        .blog-card-date {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
        }

        @media (max-width: 760px) {
          .blog-field-header {
            grid-template-columns: 1fr;
          }

          .blog-card-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 0.8rem;
          }

          .blog-pixel-card,
          .blog-pixel-card:nth-child(3n + 1),
          .blog-pixel-card:nth-child(3n + 2) {
            flex: 0 0 min(82vw, 24rem);
            min-height: 18rem;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}
