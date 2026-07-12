'use client';

import Link from 'next/link';
import {
  BuildingsIcon,
  DashboardIcon,
  DatabaseIcon,
  GridIcon,
  ImageIcon,
  LayersIcon,
  LogsIcon,
  MegaphoneIcon,
  SettingsIcon,
  ShieldIcon,
  TagIcon,
  UsersIcon,
} from './icons';

const mainNav = [
  { label: 'Dashboard', icon: DashboardIcon, active: true },
  { label: 'Buildings', icon: BuildingsIcon },
  { label: 'Floors', icon: LayersIcon },
  { label: 'Rooms', icon: GridIcon },
  { label: '360° Tours', icon: ImageIcon },
  { label: 'Users', icon: UsersIcon },
];

const managementNav = [
  { label: 'Categories', icon: TagIcon },
  { label: 'Labels', icon: TagIcon },
  { label: 'Media Library', icon: ImageIcon },
  { label: 'Announcements', icon: MegaphoneIcon },
];

const systemNav = [
  { label: 'Settings', icon: SettingsIcon },
  { label: 'Roles & Permissions', icon: ShieldIcon },
  { label: 'Backup & Restore', icon: DatabaseIcon },
  { label: 'Logs', icon: LogsIcon },
];

function NavGroup({ title, items }: { title?: string; items: { label: string; icon: any; active?: boolean }[] }) {
  return (
    <div>
      {title && <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{title}</p>}
      <div className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium transition ${
                item.active ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
              }`}
            >
              <Icon className="h-[17px] w-[17px]" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  return (
    <aside className="hidden w-[240px] shrink-0 flex-col border-r border-white/5 bg-ink-950 px-3 py-5 lg:flex">
      <div className="flex items-center gap-3 px-2 pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-base font-black text-white">
          H
        </div>
        <div className="leading-tight">
          <p className="text-[13px] font-bold tracking-wide text-white">HELWAN</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">National University</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <NavGroup title="Main" items={mainNav} />
        <NavGroup title="Management" items={managementNav} />
        <NavGroup title="System" items={systemNav} />
      </div>

      <Link
        href="/"
        target="_blank"
        className="mt-4 flex items-center justify-center rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
      >
        Preview Website
      </Link>
    </aside>
  );
}
