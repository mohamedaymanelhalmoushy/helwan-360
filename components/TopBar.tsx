'use client';

import Link from 'next/link';
import { FullscreenIcon, MoonIcon, SearchIcon } from './icons';

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
  return (
    <div className="flex flex-col gap-4 border-b border-white/5 bg-ink-900/60 px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
            <h1 className="text-lg font-bold uppercase tracking-wide text-white sm:text-xl">{title}</h1>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
        )}
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
  );
}
