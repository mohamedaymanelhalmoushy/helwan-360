'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { buildings } from '../lib/data';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

export default function BuildingStrip({ activeId, onSelect }: { activeId?: string; onSelect?: (id: string) => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  }

  return (
    <div className="flex items-center gap-2 border-t border-white/5 bg-ink-900 px-4 py-4 sm:px-8">
      <button
        type="button"
        onClick={() => scrollBy(-320)}
        className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-800 text-slate-400 transition hover:text-white sm:flex"
        aria-label="Scroll left"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      <div ref={scrollerRef} className="flex flex-1 gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none]">
        {buildings.map((building) => {
          const active = building.id === activeId;
          const content = (
            <>
              <div className="relative h-20 w-full">
                <Image
                  src={building.thumb}
                  alt={building.name}
                  fill
                  sizes="130px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span
                  className={`absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    active ? 'bg-accent-500 text-ink-950' : 'bg-ink-950/80 text-white'
                  }`}
                >
                  {building.number}
                </span>
              </div>
              <p className="truncate bg-ink-800 px-2 py-1.5 text-[11px] font-semibold text-slate-200">
                {building.name}
              </p>
            </>
          );

          const classes = `group relative w-[130px] shrink-0 overflow-hidden rounded-2xl border transition ${
            active ? 'border-accent-500 ring-2 ring-accent-500/50' : 'border-white/10 hover:border-white/25'
          }`;

          if (onSelect) {
            return (
              <button
                key={building.id}
                type="button"
                onClick={() => onSelect(building.id)}
                className={`${classes} text-left`}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={building.id}
              href={`/buildings/${building.id}`}
              className={classes}
            >
              {content}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(320)}
        className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-800 text-slate-400 transition hover:text-white sm:flex"
        aria-label="Scroll right"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
