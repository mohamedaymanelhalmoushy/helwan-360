import Link from 'next/link';

export default function SidebarMenu() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 space-y-8 rounded-[2rem] bg-slate-950/95 p-8 shadow-soft ring-1 ring-white/10 backdrop-blur-xl">
        <div className="space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-500 text-2xl font-black text-white shadow-lg">H</div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-200">Helwan National University</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Student portal</h2>
          </div>
          <p className="text-sm leading-6 text-slate-300">
            Explore campus facilities, access immersive tours, and discover VIP alumni paths through the new university front page.
          </p>
        </div>

        <div className="grid gap-3 text-sm text-slate-300">
          {[
            { label: 'About HNU', href: '#about' },
            { label: 'Campus buildings', href: '#buildings' },
            { label: '360° tour', href: '#tour' },
            { label: 'Our scientists', href: '/scientists' },
            { label: 'VIP graduates', href: '/vip' },
            { label: 'Admin portal', href: '/admin' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-3xl border border-slate-800 bg-slate-900/95 px-4 py-3 transition hover:border-brand-500 hover:bg-slate-900 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="rounded-[1.75rem] bg-brand-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-200">Quick actions</p>
          <div className="mt-4 space-y-3">
            <Link href="/tour" className="block rounded-full bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              Start tour
            </Link>
            <Link href="/vip" className="block rounded-full border border-brand-500 px-4 py-3 text-center text-sm font-semibold text-brand-100 transition hover:bg-brand-500/20">
              VIP graduates
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
