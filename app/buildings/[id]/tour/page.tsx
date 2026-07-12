'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import PanoramaViewer from '../../../../components/PanoramaViewer';
import { getBuilding } from '../../../../lib/data';
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon, MapIcon, UsersIcon } from '../../../../components/icons';

export default function TourPage() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const building = getBuilding(params.id);

  const floor = useMemo(
    () => building?.floorList.find((f) => f.id === (search.get('floor') ?? building.floorList[0]?.id)) ?? building?.floorList[0],
    [building, search],
  );

  const tourRooms = floor?.tourRooms ?? [];
  const initialIndex = Math.max(
    0,
    tourRooms.findIndex((r) => r.id === search.get('point')),
  );
  const [index, setIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
  const [showRoomInfo, setShowRoomInfo] = useState(false);

  if (!building || !floor || tourRooms.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 p-8 text-center">
        <div>
          <p className="text-sm text-slate-400">No 360° tour points are available for this floor yet.</p>
          {building && (
            <Link href={`/buildings/${building.id}/floors`} className="mt-4 inline-block rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white">
              Back to Floor Map
            </Link>
          )}
        </div>
      </div>
    );
  }

  const room = tourRooms[index];
  const isDetailedRoom = Boolean(room.capacity);

  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      {/* top bar */}
      <div className="flex flex-col gap-3 border-b border-white/5 bg-ink-900 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link href={`/buildings/${building.id}/floors?floor=${floor.id}`} className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Floor Map
        </Link>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-300">360° Virtual Tour</p>
          <p className="text-xs text-slate-500">
            Campus Overview › {building.name} › {floor.name} › {room.name}
          </p>
        </div>
        <div className="hidden w-[140px] sm:block" />
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* steps sidebar */}
        <aside className="order-2 w-full shrink-0 border-t border-white/5 bg-ink-900 p-4 sm:p-5 lg:order-1 lg:w-[260px] lg:border-r lg:border-t-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Tour Steps</p>
          <p className="mt-1 text-sm font-semibold text-white">{floor.name} Tour</p>

          <div className="mt-4 space-y-1.5">
            {tourRooms.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setShowRoomInfo(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  i === index ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    i === index ? 'bg-white text-brand-700' : 'bg-ink-800 text-slate-400'
                  }`}
                >
                  {i + 1}
                </span>
                {r.name}
              </button>
            ))}
          </div>
        </aside>

        {/* main viewer */}
        <div className="relative order-1 min-h-[420px] flex-1 bg-ink-950 sm:min-h-[560px] lg:order-2">
          <PanoramaViewer url={room.panorama} alt={room.name} />

          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + tourRooms.length) % tourRooms.length)}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/80 text-white shadow-lg transition hover:bg-ink-800"
            aria-label="Previous point"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % tourRooms.length)}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/80 text-white shadow-lg transition hover:bg-ink-800"
            aria-label="Next point"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* right info panel */}
        <aside className="order-3 w-full shrink-0 border-t border-white/5 bg-ink-900 p-4 sm:p-5 lg:w-[320px] lg:border-l lg:border-t-0">
          <div className="relative h-28 w-full overflow-hidden rounded-xl border border-white/10">
            <Image src={building.image} alt={`${floor.name} map`} fill sizes="320px" className="object-cover opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center gap-1 bg-ink-950/30">
              <MapIcon className="h-5 w-5 text-white" />
              <span className="text-xs font-semibold text-white">{floor.name}</span>
            </div>
          </div>

          {isDetailedRoom ? (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Room Information</p>
              <h3 className="mt-1 text-lg font-bold text-white">{room.name}</h3>
              <p className="text-xs text-slate-500">Room {room.code}</p>

              <div className="mt-4 space-y-2.5 text-sm">
                {room.capacity && (
                  <div className="flex items-center justify-between rounded-lg bg-ink-800 px-3 py-2.5">
                    <span className="flex items-center gap-2 text-slate-400">
                      <UsersIcon className="h-4 w-4" /> Capacity
                    </span>
                    <span className="font-semibold text-white">{room.capacity}</span>
                  </div>
                )}
                <div className="flex items-center justify-between rounded-lg bg-ink-800 px-3 py-2.5">
                  <span className="text-slate-400">Room Type</span>
                  <span className="font-semibold text-white">{room.type}</span>
                </div>
                {room.area && (
                  <div className="flex items-center justify-between rounded-lg bg-ink-800 px-3 py-2.5">
                    <span className="text-slate-400">Area</span>
                    <span className="font-semibold text-white">{room.area}</span>
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Description</p>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">{room.description}</p>

              {room.facilities && room.facilities.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Facilities</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {room.facilities.map((f) => (
                      <span key={f} className="rounded-full border border-white/10 bg-ink-800 px-2.5 py-1 text-[11px] text-slate-300">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href={`/buildings/${building.id}/floors?floor=${floor.id}`}
                className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                <MapIcon className="h-4 w-4" />
                View on Floor Map
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white">{room.name}</h3>
              <p className="text-xs text-slate-500">Tour Point {index + 1} of {tourRooms.length}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{room.description}</p>

              {room.pointsOfInterest && room.pointsOfInterest.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Points of Interest</p>
                  <div className="mt-2 space-y-1.5">
                    {room.pointsOfInterest.map((poi) => (
                      <p key={poi} className="text-sm text-slate-300">
                        · {poi}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowRoomInfo((v) => !v)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                <InfoIcon className="h-4 w-4" />
                View Information
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto border-t border-white/5 bg-ink-900 px-4 py-3 sm:px-8">
        {tourRooms.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              i === index ? 'border-accent-500 bg-accent-500/10 text-white' : 'border-white/10 bg-ink-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-950 text-[10px]">{i + 1}</span>
            {r.name}
          </button>
        ))}
      </div>
    </div>
  );
}
