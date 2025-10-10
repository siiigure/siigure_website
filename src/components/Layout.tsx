interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function Layout({ title, description, children }: LayoutProps) {
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-indigo-600 via-sky-600 to-purple-600 text-white selection:bg-white/30 selection:text-black"
      data-title={title ?? ''}
      data-description={description ?? ''}
    >
      {/* site-container 负责 max-width + padding，统一全站边距 */}
      <div className="relative z-10 site-container py-8 sm:py-12">
        {children}
      </div>
    </div>
  );
}
