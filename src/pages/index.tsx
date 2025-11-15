'use client';

import { useState, useEffect } from 'react';
import SocialLinks from '@/components/SocialLinks';
import HomeNav from '@/components/HomeNav';
import BlogNav from '@/components/blogNav';
import ScrollSnapWrapper from '@/components/ScrollSnapWrapper';
import MoreSection from './more';
import PhotographySection from './photography';

export default function HomePage() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const ids = ['about', 'blog', 'more'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ScrollSnapWrapper>
      <section id="about">
        {/* 顶部 mobile nav */}
        <div
          className="
        home-left
         col-span-1
          hidden
           [@media(max-width:767px)]:block
           "
        >
          <HomeNav activeId={active} onChange={setActive} />
        </div>

        <header
          className="
      mono-55 
      mt-24 md:mt-28 lg:mt-14 
      w-full max-w-none md:max-w-[600px] 
      mx-auto px-4
      flex flex-col items-start
      md:whitespace-nowrap
      mb-4 md:mb-[8rem]
    "
        >
          <div
            className="w-full"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 5rem)',
              lineHeight: 1
            }}
          >
            <h1
              className="
          text-[clamp(3rem,8vw,5rem)]
          md:text-[5rem]
          font-semibold leading-none
        "
            >
              hi! It's siigure
            </h1>

            <p
              className="
          mt-2
          text-[clamp(1.1rem,3vw,1.4rem)]
          md:text-[1.4rem]
          leading-none
        "
            >
              Front-end developer exploring full-stack possibilities.
            </p>
          </div>

          <div>
            <SocialLinks />
          </div>
        </header>

        <div className="section-spacer"></div>

        {/* ========== 正文区：标题下的左右两格 ========== */}

        <div
          className="home-main-grid grid grid-cols-4 gap-8 px-4
        [@media(min-width:380px)_and_(max-width:768px)]:grid-cols-1
        "
        >
          {/* 左侧 desktop nav */}
          <div
            className="home-left col-span-1 pt-[16rem] 
          [@media(max-width:768px)]:hidden"
          >
            <HomeNav activeId={active} onChange={setActive} />
          </div>

          {/* 右侧：正文 ———— 这是唯一需要改的地方 */}
          <style>
            {`
    @media (max-width: 767px) {
      .right-text-mobile {
        font-size: 1rem !important;
      }
    }
  `}
          </style>

          <div
            className="
    home-right
    col-span-3
    text-left
    right-text-mobile   /* 👉 给它加这个 class，用于手机字体缩小 */
    [@media(min-width:380px)_and_(max-width:76px)]:col-span-4
    [@media(min-width:380px)_and_(max-width:768px)]:text-left
    [@media(min-width:380px)_and_(max-width:768px)]:mt-1
  "
            style={{
              fontSize: '1.2rem', // 👉 平板 + 电脑保持 1.2rem
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.8)'
            }}
          >
            <p className="mb-4 md:mb-6">
              I'm a developer who cares about{' '}
              <strong className="text-white">
                how code feels — clean, elegant, and just nice to work with
              </strong>
              .
            </p>
            <p className="mb-4 md:mb-6">
              Right now, I'm focusing on{' '}
              <strong className="text-white">fullstack development</strong>,
              always learning and trying things out — from design systems and
              typography to small solutions that make interfaces feel alive. I
              enjoy experimenting and seeing how tiny changes can make a big
              difference.
            </p>
            <p className="mb-4 md:mb-6">
              Outside of coding, I spend time on{' '}
              <strong className="text-white">
                analog and creative hobbies
              </strong>{' '}
              — shooting Polaroids, watching films, reading, or building
              miniature dioramas. Music too — I play classical guitar and
              sometimes a melodica.
            </p>
            <p className="mb-4 md:mb-6">
              I enjoy making things, whether it's{' '}
              <strong className="text-white">
                code, a camera, or an instrument
              </strong>
              .
            </p>
          </div>
        </div>
        <style>
          {`
  /* 手机：小一点 */
  @media (max-width: 767px) {
    .section-spacer {
      height: 1rem;
    }
  }

  /* 平板：中等 */
  @media (min-width: 768px) and (max-width: 1023px) {
    .section-spacer {
      height: 5rem;
    }
  }

  /* 大屏：大间距 */
  @media (min-width: 1024px) {
    .section-spacer {
      height: 7rem;
    }
  }
`}
        </style>
      </section>

      <section
        id="blog"
        className="flex flex-col justify-center h-screen snap-start px-4"
      >
        <BlogNav />
      </section>

      {/* <section
        id="photos"
        className="h-screen flex items-center justify-center bg-slate-600 snap-start"
      >
        <PhotographySection />
      </section> */}

      <section
        id="more"
        className="h-screen flex items-center justify-center bg-slate-500 snap-start"
      >
        <MoreSection />
      </section>
    </ScrollSnapWrapper>
  );
}
