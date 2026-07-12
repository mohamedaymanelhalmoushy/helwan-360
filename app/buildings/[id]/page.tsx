import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import TopBar from '../../../components/TopBar';
import BuildingStrip from '../../../components/BuildingStrip';
import { buildings, getBuilding } from '../../../lib/data';
import { CompassIcon, DoorIcon } from '../../../components/icons';

export function generateStaticParams() {
  return buildings.map((b) => ({ id: b.id }));
}

export default function BuildingDetailPage({ params }: { params: { id: string } }) {
  const building = getBuilding(params.id);
  if (!building) notFound();

  return (
    <div className="flex min-h-screen bg-ink-950">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar crumbs={[{ label: 'Campus Overview', href: '/' }, { label: building.name }]} />

        <div className="flex flex-1 flex-col gap-0 lg:flex-row">
          <div className="relative min-h-[420px] flex-1 overflow-hidden bg-ink-900 sm:min-h-[560px]">
            <Image src={building.image} alt={building.name} fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 65vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-ink-950/30" />

            {/* Floating building card */}
            <div className="absolute left-4 top-4 w-[260px] rounded-2xl border border-white/10 bg-ink-950/85 p-5 backdrop-blur sm:left-6 sm:top-6">
              <h2 className="text-lg font-bold text-white">{building.name}</h2>
              <p className="text-xs text-slate-500">Building No. {building.number}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <MiniStat label="Floors" value={building.floors} />
                <MiniStat label="Rooms" value={building.roomsCount} />
                <MiniStat label="Labs" value={building.labsCount} />
                <MiniStat label="Departments" value={building.departmentsCount} />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">{building.short}</p>

              <Link
                href={`/buildings/${building.id}/floors`}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                View Floors ›
              </Link>
            </div>

            <p className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full bg-ink-950/80 px-4 py-2 text-xs text-slate-400 sm:block">
              Scroll to zoom · Drag to rotate · Click on building to enter
            </p>
          </div>

          <aside className="w-full shrink-0 border-t border-white/5 bg-ink-900 p-5 sm:p-6 lg:w-[340px] lg:border-l lg:border-t-0">
            <div className="relative h-36 w-full overflow-hidden rounded-2xl border border-white/10">
              <Image src={building.image} alt={`${building.name} minimap`} fill sizes="340px" className="object-cover opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-ink-950 shadow-xl">
                  {building.number}
                </span>
              </div>
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">{building.name}</h3>
            <p className="text-xs text-slate-500">Building No. {building.number}</p>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <MiniStat label="Floors" value={building.floors} />
              <MiniStat label="Rooms" value={building.roomsCount} />
              <MiniStat label="Labs" value={building.labsCount} />
              <MiniStat label="Departments" value={building.departmentsCount} />
            </div>

            {building.departments.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Departments</p>
                <div className="mt-2.5 space-y-2">
                  {building.departments.map((dep, i) => (
                    <div key={dep} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="h-2 w-2 rounded-full" style={{ background: ['#f59e0b', '#22c55e', '#a855f7'][i % 3] }} />
                      {dep}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={`/buildings/${building.id}/floors`}
              className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-500"
            >
              <DoorIcon className="h-4 w-4" />
              Enter Building
            </Link>
            <Link
              href={`/buildings/${building.id}/floors?autotour=1`}
              className="mt-2.5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
            >
              <CompassIcon className="h-4 w-4" />
              Start Building Tour
            </Link>
          </aside>
        </div>

        <BuildingStrip activeId={building.id} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-ink-800 px-3 py-2">
      <p className="text-[9px] uppercase tracking-[0.15em] text-slate-500">{label}</p>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  );
}
