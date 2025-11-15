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
  { label: 'X', href: 'https://x.com/siigureouo?s=21', icon: '/icons/x.svg' },
  {
    label: 'Gmail',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=siiigureouo@gmail.com',
    icon: '/icons/gmail.svg'
  }
];

export default function SocialLinksComponent() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;

  return (
    <div className="flex justify-start items-center flex-wrap mt-[4px] gap-[20px]">
      {socialLinks.map(({ label, href, icon }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block hover:scale-110 transition-transform duration-200 ${
            i !== socialLinks.length - 1 ? 'mr-8 md:mr-12 lg:mr-16' : ''
          }`} // 控制图标间距
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
