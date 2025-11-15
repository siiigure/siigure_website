'use client';

import Image from 'next/image';

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

function PhotoGrid({ items }: { items: typeof photos }) {
  return (
    <>
      {/* 桌面端两行四列 */}
      <div className="hidden md:grid grid-cols-4 gap-2 justify-center">
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

      {/* 手机和平板竖屏横向滚动 */}
      <div className="md:hidden flex gap-2 overflow-x-auto px-4 snap-x snap-mandatory scrollbar-hide">
        {items.map((photo, index) => (
          <div
            key={index}
            className="flex-none snap-start w-[70vw] max-w-[250px]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={250}
              height={200} // 高度自动缩放，object-contain 保持比例
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

export default function PhotographySection() {
  return (
    <section className="min-h-screen snap-start px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Photography
      </h1>
      <PhotoGrid items={photos} />
      <p className="mt-4 text-gray-300 max-w-3xl mx-auto text-center text-sm">
        Here's a selection of scenic Polaroids I've snapped so far—more will go
        up as I find new favorites. Stay tuned for those messy little moments
        that somehow make life totally worth it.
      </p>
    </section>
  );
}
