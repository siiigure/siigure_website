// src/components/Layout.tsx
interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function Layout({ title, description, children }: LayoutProps) {
  return (
    <>
      {/* 背景层 */}
      <div
        className="min-h-screen w-full relative overflow-hidden
          bg-gradient-to-b from-indigo-600 via-sky-600 to-purple-600 text-white
          selection:bg-white/30 selection:text-black"
      >
        {/* 内容容器 */}
        <div className="relative z-10 max-w-[900px] mx-auto px-8 py-12">
          {children}
        </div>
      </div>
    </>
  );
}
