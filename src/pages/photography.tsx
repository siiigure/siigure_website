'use client';

import Image from 'next/image';

// Photo data
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

// Photo grid component
function PhotoGrid({ items }: { items: typeof photos }) {
  return (
    <div className="photography-grid">
      {items.map((photo, index) => (
        <div key={index} className="photography-item">
          <div className="relative w-full aspect-[88/108]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <p className="photography-caption">{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}

// Main photography section
export default function PhotographySection() {
  return (
    <section className="photography-section min-h-screen snap-start">
      <h1 className="photography-title">Photography</h1>
      <PhotoGrid items={photos} />
      <p className="mt-6">
        Here's a selection of scenic Polaroids I've snapped so far—more will go
        up as I find new favorites. Stay tuned for those messy little moments
        that somehow make life totally worth it.
      </p>
    </section>
  );
}
