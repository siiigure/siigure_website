'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/siiigure',
    icon: '/icons/github.svg'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/siigure/profilecard/?igsh=aWQxNDNmb3FhbzR1',
    icon: '/icons/instagram.svg'
  },
  {
    label: 'Threads',
    href: 'https://www.threads.net/@siigure',
    icon: '/icons/threads.svg'
  },
  {
    label: 'X',
    href: 'https://x.com/siigureouo?s=21',
    icon: '/icons/x.svg'
  },
  {
    label: 'Gmail',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=siiigureouo@gmail.com',
    icon: '/icons/gmail.svg'
  }
];

export default function SocialLinksComponent() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // 确保组件在客户端完全加载后再渲染内容
  }, []);

  if (!hydrated) {
    // 在客户端加载完成之前，返回一个空的占位符，避免 Hydration 错误
    return null;
  }

  return (
    <div className="social-links">
      {socialLinks.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block items-center"
        >
          <Image
            src={icon}
            width={24}
            height={24}
            alt={label}
            className="filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-200"
          />
        </a>
      ))}
    </div>
  );
}
