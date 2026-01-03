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

  /* === Intersection Observer: Update active section === */
  useEffect(() => {
    const ids = ['about', 'blog', 'more'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ScrollSnapWrapper>
      {/* === ABOUT SECTION === */}
      <section id="about">
        <div className="home-left col-span-1 hidden [@media(max-width:767px)]:block">
          <HomeNav activeId={active} onChange={setActive} />
        </div>

        {/* Header content */}
        <header className="mt-24 md:mt-28 lg:mt-14 w-full max-w-none md:max-w-[600px] mx-auto px-4 flex flex-col items-start mb-4 md:mb-[8rem]">
          <div
            className="w-full"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 5rem)', lineHeight: 1 }}
          >
            <h1 className="text-[clamp(3rem,8vw,5rem)] md:text-[5rem] font-semibold leading-none">
              hi! It's siigure
            </h1>

            <p className="mt-2 text-[clamp(1.1rem,3vw,1.4rem)] md:text-[1.4rem] leading-none">
              Front-end developer exploring full-stack possibilities.
            </p>
          </div>

          <div>
            <SocialLinks />
          </div>
        </header>

        <div className="section-spacer"></div>

        {/* === MAIN CONTENT GRID === */}
        <div className="home-main-grid grid grid-cols-4 gap-8 px-4 [@media(min-width:380px)_and_(max-width:768px)]:grid-cols-1">
          {/* Desktop Nav */}
          <div className="home-left col-span-1 pt-[12rem] [@media(max-width:768px)]:hidden">
            <HomeNav activeId={active} onChange={setActive} />
          </div>

          {/* Right column text block */}
          <style>
            {`
              @media (max-width: 767px) {
                .right-text-mobile { font-size: 1rem !important; }
              }
            `}
          </style>

          <div
            className="home-right col-span-3 text-left right-text-mobile [@media(min-width:380px)_and_(max-width:768px)]:text-left [@media(min-width:380px)_and_(max-width:768px)]:mt-1"
            style={{
              fontSize: '1.2rem',
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
              typography to small solutions that make interfaces feel alive.
            </p>
            <p className="mb-4 md:mb-6">
              Outside of coding, I enjoy{' '}
              <strong className="text-white">
                analog and creative hobbies
              </strong>{' '}
              — Polaroids, films, and miniature dioramas. Music too, I play
              classical guitar and sometimes a melodica.
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

        {/* === SPACER SIZE RULES === */}
        <style>
          {`
            @media (max-width: 767px) {
              .section-spacer { height: 1rem; }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              .section-spacer { height: 5rem; }
            }
            @media (min-width: 1024px) {
              .section-spacer { height: 7rem; }
            }
          `}
        </style>
      </section>

      {/* === BLOG SECTION === */}
      <section id="blog">
        <BlogNav />
      </section>

      {/* === PHOTOGRAPHY SECTION === */}
      <section id="photos">
        <PhotographySection />
      </section>

      {/* === MORE SECTION === */}
      <section
        id="more"
        className="h-screen flex items-center justify-center snap-start"
      >
        <MoreSection />
      </section>
    </ScrollSnapWrapper>
  );
}
