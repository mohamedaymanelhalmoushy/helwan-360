'use client';

import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import { buildings } from '../../lib/data';

export default function BuildingsPage() {
  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar crumbs={[{ label: 'Campus Overview', href: '/' }, { label: 'Buildings' }]} title="All Buildings" subtitle="Browse every building on campus" />

        <div className="grid flex-1 grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-8 xl:grid-cols-3">
          {buildings.map((building) => (
            <Link
              key={building.id}
              href={`/buildings/${building.id}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition hover:border-brand-500/60"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={building.image}
                  alt={building.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/90 text-xs font-bold text-white">
                  {building.number}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-white">{building.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-400">{building.short}</p>
                <div className="mt-3 flex gap-3 text-xs text-slate-500">
                  <span>{building.floors} Floors</span>
                  <span>{building.roomsCount} Rooms</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
