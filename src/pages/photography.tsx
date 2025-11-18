'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// === Photo Data ===
const photos = [
  {
    src: '/photos/photography/AnMa.jpg',
    alt: 'Nanjing Street',
    caption: 'Mount Kurama · 2025/01'
  },
  {
    src: '/photos/photography/tokyo.png',
    alt: 'Tokyo Street',
    caption: 'Nihonbashi · 2025/01'
  },
  {
    src: '/photos/photography/kawa.jpg',
    alt: 'Kamogawa',
    caption: 'Kamogawa · 2025/01'
  },
  {
    src: '/photos/photography/Kamokawa.jpg',
    alt: 'Kamo',
    caption: 'Kyoto Sunset · 2025/01'
  },
  {
    src: '/photos/photography/JingAn.jpg',
    alt: "Jing'an Temple",
    caption: "Jing'an Temple · 2024/07"
  },
  {
    src: '/photos/photography/ito.jpg',
    alt: 'Ito Night',
    caption: 'Izu Pacific Coast · 2025/01'
  },
  {
    src: '/photos/photography/NanJing.jpg',
    alt: 'Nanjing City',
    caption: 'Niushou Mountain · 2024/10'
  },
  {
    src: '/photos/photography/Ueno.png',
    alt: 'Ueno Park',
    caption: 'Ueno Park · 2025/02'
  }
];

// === Photo Grid Component ===
function PhotoGrid({ items }: { items: typeof photos }) {
  return (
    <>
      <div className="hidden min-[781px]:grid grid-cols-4 gap-2 justify-center">
        {items.map((photo, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={200}
              height={200}
              className="object-contain rounded-lg"
            />
            <p className="mt-1 text-xs text-gray-300 text-center">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="flex max-[780px]:flex max-[780px]:overflow-x-auto max-[780px]:snap-x max-[780px]:snap-mandatory max-[780px]:px-4 max-[780px]:gap-2 scrollbar-hide min-[781px]:hidden">
        {items.map((photo, index) => (
          <div
            key={index}
            className="flex-none snap-start w-[70vw] max-w-[250px]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={250}
              height={200}
              className="object-contain rounded-lg"
            />
            <p className="mt-1 text-xs text-gray-300 text-center">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

// === Photography Section ===
export default function PhotographySection() {
  const [paddingTop, setPaddingTop] = useState('5rem');
  const [titleMarginBottom, setTitleMarginBottom] = useState('6rem');

  useEffect(() => {
    const updateSpacing = () => {
      if (window.innerWidth <= 700) {
        setPaddingTop('1rem');
        setTitleMarginBottom('8rem');
      } else {
        setPaddingTop('5rem');
        setTitleMarginBottom('6rem');
      }
    };
    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);

  return (
    <section
      className="min-h-screen snap-start"
      style={{
        paddingTop: paddingTop, // 用 state
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          lineHeight: 1,
          marginBottom: titleMarginBottom, // 用 state
          textAlign: 'left',
          color: 'white'
        }}
      >
        Photography
      </h1>

      <PhotoGrid items={photos} />

      <div
        className="home-right col-span-3 text-left right-text-mobile [@media(min-width:380px)_and_(max-width:768px)]:text-left [@media(min-width:380px)_and_(max-width:768px)]:mt-1"
        style={{
          fontSize: '1.2rem',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.8)'
        }}
      >
        <p className="mb-4 md:mb-6">
          Here's a selection of scenic Polaroids—more to come as I find new
          favorites. Stay tuned for those messy little moments that make life
          worth it.
        </p>
      </div>
    </section>
  );
}
