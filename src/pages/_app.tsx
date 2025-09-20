// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css'; // ← Tailwind 全局样式
import '../styles/home_1.css'; // ← Tailwind 全局样式
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
