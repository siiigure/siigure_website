import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import BlogArticleRenderer from '@/components/blog/BlogArticleRenderer';
import type { BlogPost } from '@/lib/blog';

type BlogPostPageProps = {
  post: BlogPost;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { getBlogSlugs } = await import('@/lib/blog');

  return {
    paths: getBlogSlugs().map((slug) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const { getBlogPost } = await import('@/lib/blog');
  const slug = String(params?.slug ?? '');

  return {
    props: {
      post: getBlogPost(slug)
    }
  };
};

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <main className="blog-page">
      <header className={`blog-page-header ${post.theme}`}>
        <div className="blog-page-meta">
          <span>[*] {post.category}</span>
          <span>{post.date}</span>
        </div>
        <h1>{post.title}</h1>
        <p>{post.eyebrow}</p>
      </header>

      <BlogArticleRenderer content={post.content} />

      <footer className="blog-page-footer">
        <Link href="/#blog" aria-label="Back to Blog">
          [←] BACK TO BLOG
        </Link>
      </footer>

      <style jsx global>{`
        .blog-page {
          width: min(86vw, 860px);
          margin: 0 auto;
          padding: clamp(5rem, 10vh, 8rem) 0 8rem;
        }

        .blog-page-header {
          margin-bottom: clamp(5rem, 12vh, 9rem);
          text-align: right;
        }

        .blog-page-meta {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-bottom: 1.2rem;
          color: rgba(255, 255, 255, 0.56);
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        .blog-page-header h1 {
          margin: 0;
          color: #fff;
          font-size: clamp(2.8rem, 7vw, 5.2rem);
          font-weight: 600;
          line-height: 0.98;
        }

        .blog-page-header.pink h1 {
          color: #ffd8ea;
        }

        .blog-page-header.blue h1 {
          color: #d8ecff;
        }

        .blog-page-header p {
          margin: 1rem 0 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: clamp(1rem, 2vw, 1.35rem);
        }

        .blog-article {
          max-width: 800px;
          margin: 0 auto;
        }

        .blog-article p {
          margin: 0 0 1.6rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(1.02rem, 2.4vw, 1.28rem);
          line-height: 1.9;
        }

        .blog-article h2 {
          margin: 4.5rem 0 1.8rem;
          color: #ffd8ea;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 600;
          line-height: 1;
        }

        .blog-article h3 {
          margin: 3.5rem 0 1.4rem;
          color: #fff;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 600;
        }

        .blog-section-rule,
        .blog-article hr {
          width: 72%;
          margin: 4.5rem auto;
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.22);
        }

        .blog-quote {
          margin: 2.5rem 0;
          padding-left: 1.4rem;
          border-left: 3px solid rgba(255, 255, 255, 0.64);
        }

        .blog-quote p {
          margin-bottom: 0.85rem;
          color: rgba(255, 255, 255, 0.82);
        }

        .blog-code {
          margin: 2.6rem 0;
          padding: 1.2rem;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 6px;
          background: rgba(2, 8, 18, 0.34);
          color: rgba(255, 255, 255, 0.94);
          font-family: Consolas, Menlo, monospace;
          font-size: 0.92rem;
          line-height: 1.65;
        }

        .blog-inline-link {
          color: #fff;
          text-decoration: underline;
          text-decoration-color: rgba(255, 216, 234, 0.72);
          text-underline-offset: 4px;
        }

        .blog-image-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 2.2rem 0;
        }

        .blog-image-row img {
          max-width: min(100%, 620px);
          height: auto;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .blog-image-row.two-up img {
          width: min(48%, 360px);
        }

        .blog-page-footer {
          max-width: 800px;
          margin: 5rem auto 0;
        }

        .blog-page-footer a {
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          transition:
            color 180ms ease,
            background 180ms ease;
        }

        .blog-page-footer a:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 700px) {
          .blog-page {
            width: min(90vw, 800px);
            padding-top: 4rem;
          }

          .blog-page-header {
            text-align: left;
          }

          .blog-page-meta {
            justify-content: flex-start;
            flex-wrap: wrap;
          }

          .blog-image-row,
          .blog-image-row.two-up {
            flex-direction: column;
          }

          .blog-image-row.two-up img {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
