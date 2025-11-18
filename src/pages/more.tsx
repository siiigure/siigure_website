'use client';

import Image from 'next/image';

export default function MoreSection() {
  return (
    <section className="more-section">
      {/* Section title */}
      <h1
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          lineHeight: 1,
          marginBottom: '1.5rem',
          textAlign: 'left',
          color: 'white'
        }}
      >
        More to Come
      </h1>

      {/* Featured image */}
      <div className="relative mt-6 aspect-[3/2] more-image">
        <Image
          src="/photos/road.jpg"
          alt="Tokyo Road"
          fill
          className="object-contain rounded-lg"
        />
      </div>

      {/* Introductory paragraphs */}
      <div
        className="home-right col-span-3 text-left right-text-mobile [@media(min-width:380px)_and_(max-width:768px)]:text-left [@media(min-width:380px)_and_(max-width:768px)]:mt-1"
        style={{
          fontSize: '1.2rem',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.8)'
        }}
      >
        <p className="mb-4 md:mb-6">
          These are bits and pieces of my life—still messy, not in any order,
          and definitely a work in progress...
        </p>
        <p className="mb-4 md:mb-6">
          Slowly sharing them with you, and thanks for sticking around to check
          it out.
        </p>
      </div>
    </section>
  );
}
