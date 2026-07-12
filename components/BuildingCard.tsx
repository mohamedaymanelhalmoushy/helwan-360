'use client';

import Image from 'next/image';
import { useState } from 'react';

type BuildingCardProps = {
  title: string;
  description: string;
  image: string;
  highlights: string[];
  tourLink: string;
};

export default function BuildingCard({ title, description, image, highlights, tourLink }: BuildingCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-72 overflow-hidden">
          <Image
            fill
            src={image}
            alt={title}
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 456px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Building</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <p className="text-sm leading-6 text-slate-400">{description}</p>
          <div className="grid gap-3 text-sm text-slate-300">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-3xl bg-slate-900/80 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-brand-500 hover:bg-slate-800"
            >
              Building info
            </button>
            <a href={tourLink} className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              Take a tour
            </a>
          </div>
        </div>
      </article>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/90 p-6">
          <div className="relative w-full max-w-2xl rounded-[2rem] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 rounded-full bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200"
            >
              Close
            </button>
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-500 text-xl font-bold text-white">{title.charAt(0)}</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-brand-600">Building information</p>
                  <h3 className="mt-2 text-3xl font-semibold text-slate-950">{title}</h3>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-700">{description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item} className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={tourLink} className="inline-flex items-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
                  Enter building tour
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Close window
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
