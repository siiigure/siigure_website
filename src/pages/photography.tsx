'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

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

const rotations = [
  '-1.2deg',
  '0.8deg',
  '-0.5deg',
  '1deg',
  '-0.8deg',
  '0.7deg',
  '-0.9deg',
  '0.5deg'
];

type PolaroidStyle = CSSProperties & { '--tilt': string };

function PolaroidField({ items }: { items: typeof photos }) {
  return (
    <div className="polaroid-field">
      <div className="polaroid-track no-scrollbar" aria-label="Polaroid photography">
        {items.map((photo, index) => (
          <div
            key={photo.src}
            className="polaroid-card"
            style={{ '--tilt': rotations[index] } as PolaroidStyle}
          >
            <div className="polaroid-frame">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={880}
                height={1070}
                className="polaroid-image"
              />
            </div>
            <p className="polaroid-caption">{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PhotographySection() {
  return (
    <section className="photography-section min-h-screen snap-start">
      <header className="photography-header">
        <div className="field-section-kicker">03 / POLAROID</div>
        <h1>Photography</h1>
      </header>

      <PolaroidField items={photos} />

      <div className="photography-note">
        <p>
          Here&apos;s a selection of scenic Polaroids. Same quiet format, just
          enough room to slide through the pile.
        </p>
      </div>

      <style jsx global>{`
        .photography-section {
          width: min(92vw, 1120px);
          margin: 0 auto;
          padding: clamp(4.5rem, 9vh, 6rem) 0 3rem;
          display: flex;
          min-height: 100vh;
          flex-direction: column;
          justify-content: center;
        }

        .field-section-kicker {
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .photography-header h1 {
          margin: 0;
          color: white;
          font-size: clamp(2.45rem, 5vw, 4rem);
          font-weight: 600;
          line-height: 1;
        }

        .polaroid-field {
          margin-top: clamp(2rem, 5vh, 3.4rem);
        }

        .polaroid-track {
          display: flex;
          align-items: flex-start;
          gap: clamp(1.2rem, 3vw, 2rem);
          overflow-x: auto;
          overflow-y: visible;
          scroll-snap-type: x mandatory;
          padding: 0.8rem 0.4rem 1.6rem;
        }

        .polaroid-card {
          flex: 0 0 clamp(9.8rem, 18vw, 12.5rem);
          width: min(100%, 12.5rem);
          scroll-snap-align: center;
          transform: rotate(var(--tilt));
          transform-origin: center 65%;
          transition:
            transform 420ms ease,
            filter 420ms ease;
        }

        .polaroid-card:nth-child(even) {
          margin-top: 2.1rem;
        }

        .polaroid-card:hover {
          filter: brightness(1.05);
          transform: translateY(-0.45rem) rotate(0deg);
        }

        .polaroid-frame {
          aspect-ratio: 88 / 107;
          overflow: hidden;
          box-shadow: 0 18px 38px rgba(15, 28, 60, 0.18);
        }

        .polaroid-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .polaroid-caption {
          margin: 0.85rem 0 0;
          color: rgba(255, 255, 255, 0.86);
          font-size: 0.9rem;
          line-height: 1.3;
          text-align: center;
          transition: color 260ms ease;
        }

        .polaroid-card:hover .polaroid-caption {
          color: #f9d2e4;
        }

        .photography-note {
          max-width: 760px;
          margin-top: clamp(1.4rem, 4vh, 2.5rem);
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(1rem, 2vw, 1.18rem);
          line-height: 1.65;
        }

        .photography-note p {
          margin: 0;
        }

        @media (max-width: 760px) {
          .photography-section {
            width: min(90vw, 1120px);
          }

          .polaroid-card {
            flex-basis: min(70vw, 16rem);
          }
        }
      `}</style>
    </section>
  );
}
