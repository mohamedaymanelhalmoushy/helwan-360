'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Sidebar from '../../../../components/Sidebar';
import TopBar from '../../../../components/TopBar';
import BuildingStrip from '../../../../components/BuildingStrip';
import { getBuilding } from '../../../../lib/data';
import { CheckIcon, CompassIcon, LayersIcon, XIcon } from '../../../../components/icons';

const roomColors: Record<string, string> = {
  Office: '#22c55e',
  Lab: '#38bdf8',
  Hall: '#a855f7',
  Facility: '#f59e0b',
  'Lecture Hall': '#a855f7',
};

export default function FloorsPage() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const building = getBuilding(params.id);

  const [floorId, setFloorId] = useState<string>(search.get('floor') ?? building?.floorList[0]?.id ?? '');
  const [showModal, setShowModal] = useState(search.get('autotour') !== '1' || !search.get('floor'));

  const floor = useMemo(() => building?.floorList.find((f) => f.id === floorId), [building, floorId]);

  if (!building) return null;

  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <TopBar
          crumbs={[
            { label: 'Campus Overview', href: '/' },
            { label: building.name, href: `/buildings/${building.id}` },
            { label: floor ? floor.name : 'Select Floor' },
          ]}
        />

        {/* Floor overview */}
        {floor && (
          <div className="flex flex-1 flex-col gap-0 lg:flex-row">
            <div className="flex-1 p-5 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{building.name}</p>
                  <h2 className="text-xl font-bold text-white">{floor.name} Overview</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-800 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-ink-700"
                >
                  <LayersIcon className="h-4 w-4" />
                  Change Floor
                </button>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <FloorStat label="Rooms" value={floor.rooms} />
                <FloorStat label="Labs" value={floor.labs} />
                <FloorStat label="Offices" value={floor.offices} />
                <FloorStat label="Facilities" value={floor.facilities} />
              </div>

              {/* schematic floor plan */}
              <div className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                {floor.tourRooms.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {floor.tourRooms.map((room) => (
                      <Link
                        key={room.id}
                        href={`/buildings/${building.id}/tour?floor=${floor.id}&point=${room.id}`}
                        className="group rounded-xl border border-white/10 bg-ink-800 p-4 transition hover:border-white/30"
                      >
                        <span
                          className="mb-2 inline-flex h-2.5 w-2.5 rounded-full"
                          style={{ background: roomColors[room.type] ?? '#94a3b8' }}
                        />
                        <p className="text-sm font-semibold text-white">{room.name}</p>
                        <p className="text-xs text-slate-500">{room.code}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="py-10 text-center text-sm text-slate-500">
                    Detailed room layout for this floor is being prepared. Check back soon, or explore the Ground Floor tour.
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-4 border-t border-white/5 pt-4 text-xs text-slate-400">
                  {Object.entries(roomColors)
                    .filter(([label]) => label !== 'Lecture Hall')
                    .map(([label, color]) => (
                      <span key={label} className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                        {label}s
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Floor info side panel */}
            <aside className="w-full shrink-0 border-t border-white/5 bg-ink-900 p-5 sm:p-6 lg:w-[340px] lg:border-l lg:border-t-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Floor Information</p>
              <h3 className="mt-2 text-lg font-bold text-white">{floor.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{floor.description}</p>

              {floor.tourRooms.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Quick Navigation</p>
                  <div className="mt-2.5 grid grid-cols-2 gap-2">
                    {floor.tourRooms.map((room) => (
                      <Link
                        key={room.id}
                        href={`/buildings/${building.id}/tour?floor=${floor.id}&point=${room.id}`}
                        className="rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-center text-xs font-medium text-slate-300 transition hover:border-brand-500 hover:text-white"
                      >
                        {room.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href={
                  floor.tourRooms.length > 0
                    ? `/buildings/${building.id}/tour?floor=${floor.id}&point=${floor.tourRooms[0].id}`
                    : `/buildings/${building.id}/tour?floor=${floor.id}`
                }
                className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-500"
              >
                <CompassIcon className="h-4 w-4" />
                Start 360° Tour
              </Link>
            </aside>
          </div>
        )}

        {/* floor tabs strip */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-white/5 bg-ink-900 px-5 py-3 sm:px-8">
          {building.floorList.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFloorId(f.id);
                setShowModal(false);
              }}
              className={`shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                f.id === floorId ? 'bg-brand-600 text-white' : 'bg-ink-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <BuildingStrip activeId={building.id} />

        {/* Select floor modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-ink-900 p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => building.floorList.length && setShowModal(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-500 transition hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <XIcon className="h-4 w-4" />
              </button>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Select Floor</p>
              <h2 className="mt-1 text-lg font-bold text-white">Choose a floor to start your tour</h2>

              <div className="mt-5 max-h-[360px] space-y-2.5 overflow-y-auto pr-1">
                {building.floorList.map((f) => {
                  const active = f.id === floorId;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFloorId(f.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
                        active ? 'border-brand-500 bg-brand-500/10' : 'border-white/10 bg-ink-800 hover:border-white/25'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{f.name}</p>
                        <p className="text-xs text-slate-500">
                          {f.rooms} Rooms · {f.labs} Labs · {f.offices} Offices
                        </p>
                      </div>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          active ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-600'
                        }`}
                      >
                        {active && <CheckIcon className="h-3 w-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-500"
              >
                Start Tour ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FloorStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-ink-900 border border-white/10 p-3.5">
      <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </div>
  );
}
