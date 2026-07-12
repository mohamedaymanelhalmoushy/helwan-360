'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import BuildingStrip from '../components/BuildingStrip';
import { buildings } from '../lib/data';
import { XIcon } from '../components/icons';

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>('engineering-building');
  const [showInfo, setShowInfo] = useState(true);
  const selected = buildings.find((b) => b.id === selectedId) ?? buildings[0];

  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="CAMPUS OVERVIEW" subtitle="Explore all buildings in 360°" />

        <div className="relative flex flex-1">
          {/* ── Main Map Area ── */}
          <div className="relative min-h-[420px] flex-1 overflow-hidden sm:min-h-[560px]">
            <Image
              src="/images/campus-aerial.png"
              alt="Helwan National University campus aerial view"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
            {/* subtle vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-ink-950/30" />

            {/* ── Building Pins ── */}
            {buildings.map((building) => {
              const active = building.id === selectedId;
              return (
                <button
                  key={building.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(building.id);
                    setShowInfo(true);
                  }}
                  style={{ top: building.pin.top, left: building.pin.left }}
                  className="absolute -translate-x-1/2 -translate-y-full group"
                  title={building.name}
                >
                  {/* Pin shape */}
                  <svg
                    width="36"
                    height="46"
                    viewBox="0 0 36 46"
                    fill="none"
                    className={`drop-shadow-lg transition-transform ${active ? 'scale-110' : 'group-hover:scale-105'}`}
                  >
                    <path
                      d="M18 46 C18 46 36 28 36 18 C36 8.06 27.94 0 18 0 C8.06 0 0 8.06 0 18 C0 28 18 46 18 46Z"
                      fill={active ? '#f59e0b' : '#1e3a5f'}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="17"
                      r="11"
                      fill={active ? '#f59e0b' : '#1a3352'}
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <text
                      x="18"
                      y="21"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="Inter, system-ui, sans-serif"
                    >
                      {building.number}
                    </text>
                  </svg>
                </button>
              );
            })}

            {/* ── Zoom Controls ── */}
            <div className="absolute bottom-6 right-6 hidden flex-col gap-2 sm:flex">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-950/80 text-white shadow-lg backdrop-blur transition hover:bg-ink-800"
              >
                <span className="text-lg leading-none">+</span>
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-950/80 text-white shadow-lg backdrop-blur transition hover:bg-ink-800"
              >
                <span className="text-lg leading-none">−</span>
              </button>
            </div>
          </div>

          {/* ── Right Info Panel ── */}
          {showInfo && (
            <aside className="hidden w-[320px] shrink-0 flex-col border-l border-white/5 bg-ink-900 p-5 lg:flex overflow-y-auto">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Building Info
                </p>
                <button
                  type="button"
                  onClick={() => setShowInfo(false)}
                  className="rounded-full p-1 text-slate-500 transition hover:bg-white/5 hover:text-white"
                  aria-label="Close panel"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Building thumbnail */}
              <div className="relative h-32 w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>

              {/* Building name */}
              <h3 className="mt-4 text-lg font-bold text-white">{selected.name}</h3>
              <p className="text-xs text-slate-500">Building No. {selected.number}</p>

              {/* Stats */}
              <div className="mt-4 space-y-2">
                <StatRow icon="🏢" value={selected.floors} label="Floors" />
                <StatRow icon="🚪" value={selected.roomsCount} label="Rooms" />
                <StatRow icon="🔬" value={selected.labsCount} label="Labs" />
                <StatRow icon="📋" value={selected.departmentsCount} label="Departments" />
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-6 text-slate-400">{selected.description}</p>

              {/* Departments */}
              {selected.departments.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Departments
                  </p>
                  <div className="space-y-1.5">
                    {selected.departments.map((dep, i) => (
                      <div key={dep} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: ['#f59e0b', '#22c55e', '#a855f7', '#38bdf8'][i % 4] }}
                        />
                        {dep}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Tour */}
              <Link
                href={`/buildings/${selected.id}`}
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-500"
              >
                Start Tour
                <span className="text-base leading-none">›</span>
              </Link>
            </aside>
          )}
        </div>

        {/* ── Building Strip ── */}
        <BuildingStrip
          activeId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            setShowInfo(true);
          }}
        />
      </div>
    </div>
  );
}

function StatRow({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-ink-800 px-3 py-2">
      <span className="text-sm">{icon}</span>
      <span className="text-sm font-bold text-white">{value}</span>
      <span className="text-xs text-slate-400">{label}</span>
    </div>
  );
}
