import Layout from '@/components/Layout';
import Logo from '@/components/Logo';
import SocialLinks from '@/components/SocialLinks';
import Nav from '@/components/Nav';
import Rain from '@/components/Rain';

export default function Home() {
  return (
    <Layout>
      {/* 顶部栏：名字（左） + 社交（右） */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <p className="text-sm text-white/90 hidden md:block">
            前端工程师 · 写点东西 · 喜欢蓝紫配色
          </p>
        </div>

        <div>
          <SocialLinks />
        </div>
      </header>

      {/* 主要介绍区 */}
      <main className="mt-20 md:mt-28">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          你好，我是{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-white">
            Siigure
          </span>
          。
        </h2>

        <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
          我做前端、拍照、写博客。这里会放我的作品与想法——简洁、冷色系、带点交互。
        </p>

        <Nav />
      </main>

      {/* 雨效果（放在页面最底层） */}
      <Rain />
    </Layout>
  );
}
