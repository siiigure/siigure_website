'use client';

import SocialLinks from '@/components/SocialLinks';
import HomeNav from '@/components/HomeNav';
import BlogNav from '@/components/blogNav';
import ScrollSnapWrapper from '@/components/ScrollSnapWrapper';
import MoreSection from './more';
import PhotographySection from './photography';

export default function HomePage() {
  return (
    <ScrollSnapWrapper>
      {/* 首页 Section */}
      <section className="font-alan flex flex-col justify-center px-4 text-white h-screen snap-start pt-36">
        <h1 className="home-heading">hi! It's siigure</h1>
        <p className="home-subheading">
          Front-end developer exploring full-stack possibilities.
          <SocialLinks />
        </p>

        <div className="home-main-grid">
          <div className="home-left flex flex-col justify-end h-screen gap-8">
            <HomeNav />
          </div>
          <div className="home-right space-y-6 leading-relaxed">
            <p>
              I'm a developer who cares about how code feels — clean, elegant,
              and just nice to work with.
            </p>
            <p>
              Right now, I'm focusing on fullstack development, always learning
              and trying things out — from design systems and typography to
              small solutions that make interfaces feel alive. I enjoy
              experimenting and seeing how tiny changes can make a big
              difference.
            </p>
            <p>
              Outside of coding, I spend time on analog and creative hobbies —
              shooting Polaroids, watching films, reading, or building miniature
              dioramas. Music too — I play classical guitar and sometimes a
              melodica.
            </p>
            <p>
              I enjoy making things, whether it's code, a camera, or an
              instrument.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        className="px-4 flex flex-col justify-center h-screen snap-start"
      >
        <BlogNav />
      </section>

      {/* Photos Section */}
      <section
        id="photos"
        className="h-screen flex items-center justify-center bg-slate-600 snap-start"
      >
        <PhotographySection />
      </section>

      {/* More Section */}
      <section
        id="more"
        className="h-screen flex items-center justify-center bg-slate-500 snap-start"
      >
        <MoreSection />
      </section>
    </ScrollSnapWrapper>
  );
}
