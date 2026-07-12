'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FullscreenIcon, MoonIcon, SearchIcon, MenuIcon, XIcon, CompassIcon } from './icons';
import { navItems } from './Sidebar';

export type Crumb = { label: string; href?: string };

export default function TopBar({
  crumbs,
  title,
  subtitle,
}: {
  crumbs?: Crumb[];
  title?: string;
  subtitle?: string;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-white/5 bg-ink-900/60 px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger menu button for mobile */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-800 text-slate-300 transition hover:bg-ink-700 lg:hidden"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            {crumbs && crumbs.length > 0 && (
              <div className="mb-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                {crumbs.map((crumb, index) => (
                  <span key={crumb.label} className="flex items-center gap-1.5">
                    {index > 0 && <span className="text-slate-600">›</span>}
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition hover:text-slate-300">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-slate-300">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </div>
            )}
            {title && (
              <div>
                <h1 className="text-base font-bold uppercase tracking-wide text-white sm:text-lg">{title}</h1>
                {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search for buildings, labs, offices..."
              className="w-72 rounded-xl border border-white/10 bg-ink-800 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-brand-500"
            />
          </div>
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-ink-800 px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-ink-700"
          >
            EN
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-ink-800 p-2.5 text-slate-300 transition hover:bg-ink-700"
            aria-label="Fullscreen"
          >
            <FullscreenIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-ink-800 p-2.5 text-slate-300 transition hover:bg-ink-700"
            aria-label="Toggle theme"
          >
            <MoonIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slide-over Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="relative flex w-[280px] max-w-sm flex-col bg-ink-900 px-5 py-6 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              aria-label="Close menu"
            >
              <XIcon className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 px-2 pb-6" onClick={() => setIsDrawerOpen(false)}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-base font-black text-white shadow-lg shadow-brand-900/40">
                H
              </div>
              <div className="leading-tight">
                <p className="text-[13px] font-bold tracking-wide text-white">HELWAN</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">National University</p>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
              {navItems.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
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

            {/* Take a tour action button */}
            <Link
              href="/buildings/engineering-building"
              onClick={() => setIsDrawerOpen(false)}
              className="mt-4 flex items-center justify-between gap-2 rounded-2xl bg-brand-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-500"
            >
              <span className="flex items-center gap-2">
                <CompassIcon className="h-[18px] w-[18px]" />
                Take a Tour
              </span>
              <span className="text-base leading-none">›</span>
            </Link>
          </div>

          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setIsDrawerOpen(false)} />
        </div>
      )}
    </>
  );
}
