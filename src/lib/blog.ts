import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  eyebrow: string;
  category: string;
  excerpt: string;
  theme: 'pink' | 'blue' | 'white';
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function normalizePost(slug: string, data: Record<string, unknown>): BlogPostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    eyebrow: String(data.eyebrow ?? ''),
    category: String(data.category ?? 'notes'),
    excerpt: String(data.excerpt ?? ''),
    theme:
      data.theme === 'pink' || data.theme === 'blue' || data.theme === 'white'
        ? data.theme
        : 'white'
  };
}

export function getBlogSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return getBlogSlugs()
    .map((slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return normalizePost(slug, data);
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getBlogPost(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...normalizePost(slug, data),
    content
  };
}
