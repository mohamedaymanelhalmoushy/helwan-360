'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AccessibilityIcon,
  AlertIcon,
  BuildingsIcon,
  ClockIcon,
  HomeIcon,
  MapIcon,
  SettingsIcon,
  StarIcon,
  CompassIcon,
} from './icons';

const navItems = [
  { label: 'Home', href: '/', icon: HomeIcon },
  { label: 'Buildings', href: '/buildings', icon: BuildingsIcon },
  { label: 'Campus Map', href: '/', icon: MapIcon },
  { label: 'Favorites', href: '/favorites', icon: StarIcon },
  { label: 'Recent', href: '/recent', icon: ClockIcon },
  { label: 'Emergency', href: '/emergency', icon: AlertIcon },
  { label: 'Accessibility', href: '/accessibility', icon: AccessibilityIcon },
  { label: 'Settings', href: '/settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[248px] shrink-0 flex-col border-r border-white/5 bg-ink-900 px-4 py-5 lg:flex">
      <Link href="/" className="flex items-center gap-3 px-2 pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-base font-black text-white shadow-lg shadow-brand-900/40">
          H
        </div>
        <div className="leading-tight">
          <p className="text-[13px] font-bold tracking-wide text-white">HELWAN</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">National University</p>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition ${
                active
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-900/40'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2 : 1.7} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/buildings/engineering-building/floors?floor=ground&autotour=1"
        className="mt-4 flex items-center justify-between gap-2 rounded-2xl bg-brand-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-500"
      >
        <span className="flex items-center gap-2">
          <CompassIcon className="h-[18px] w-[18px]" />
          Take a Tour
        </span>
        <span className="text-base leading-none">›</span>
      </Link>
    </aside>
  );
}
