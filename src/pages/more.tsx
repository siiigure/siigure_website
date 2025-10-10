'use client';

import Image from 'next/image';

export default function MoreSection() {
  return (
    <section className="more-section">
      {/* 标题：单独类 */}
      <h1 className="more-title">More to Come</h1>

      {/* Add a custom class for this image */}
      <div className="relative mt-6 aspect-[3/2] more-image">
        <Image
          src="/photos/road.jpg"
          alt="Tokyo Road"
          fill
          className="object-contain rounded-lg"
        />
      </div>

      {/* 引言段落 */}
      <p className="mt-6">
        These are bits and pieces of my life—still messy, not in any order, and
        definitely a work in progress...
      </p>
      <p>
        Slowly sharing them with you, and thanks for sticking around to check it
        out.
      </p>
    </section>
  );
}
