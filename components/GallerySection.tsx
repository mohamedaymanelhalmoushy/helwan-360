'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type ImageItem = {
  name: string;
  url: string;
};

const defaultImages: ImageItem[] = [
  {
    name: 'Sample Panorama',
    url: '/uploads/sphere.jpg',
  },
];

export default function GallerySection() {
  const [images, setImages] = useState<ImageItem[]>(defaultImages);

  useEffect(() => {
    fetch('/api/360-images/list')
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images && data.images.length > 0 ? data.images : defaultImages);
      });
  }, []);

  return (
    <section id="tour" className="bg-slate-100 py-16">
      <div className="mx-auto max-w-7xl space-y-8 px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full bg-brand-100/50 px-4 py-2 text-sm uppercase tracking-[0.3em] text-brand-700">
            Virtual tour highlights
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            See the campus from every angle.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Browse curated 360° cards and jump directly into the immersive campus tour experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {images.slice(0, 3).map((image) => (
            <Link
              key={image.name}
              href={`/tour?image=${encodeURIComponent(image.name)}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <Image
                  fill
                  src={image.url}
                  alt={image.name}
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-xl font-semibold text-slate-900">{image.name}</h3>
                <p className="text-sm leading-6 text-slate-600">Click to enter the tour and explore this 360° view.</p>
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">
                  Open panorama
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
