import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500 text-xl font-black text-white shadow-lg">H</div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-200">Helwan National</p>
            <p className="text-xs text-slate-400">University portal</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-200 lg:flex">
          <Link href="#about" className="transition hover:text-white">About</Link>
          <Link href="#buildings" className="transition hover:text-white">Buildings</Link>
          <Link href="#tour" className="transition hover:text-white">Tour</Link>
          <Link href="/scientists" className="transition hover:text-white">Scientists</Link>
          <Link href="/vip" className="transition hover:text-white">VIP</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/vip"
            className="rounded-full border border-brand-500 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-200 transition hover:bg-brand-500/20"
          >
            VIP Alumni
          </Link>
          <Link
            href="/admin"
            className="hidden rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 lg:inline-flex"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
