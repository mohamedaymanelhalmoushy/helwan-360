import Image from 'next/image';
import Link from 'next/link';

const vipAlumni = [
  {
    name: 'Dr. Amina Hassan',
    role: 'Minister of Education',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Eng. Omar El-Sayed',
    role: 'Tech CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Prof. Sara AbdelRahman',
    role: 'Research Fellow',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
];

const stats = [
  { title: 'Academic excellence', value: '120+', subtitle: 'Programs built for global impact.' },
  { title: 'Student life', value: '30K+', subtitle: 'Vibrant communities and campus events.' },
  { title: 'Career support', value: '80%', subtitle: 'High graduate employment rate.' },
  { title: 'Global partners', value: '90+', subtitle: 'Strong industry and university partnerships.' },
];

export default function HomepageSections() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-10 hidden h-80 w-80 rounded-full bg-brand-500/10 blur-3xl lg:block" />
      <div className="pointer-events-none absolute right-0 top-24 hidden h-72 w-72 rounded-full bg-slate-400/5 blur-3xl lg:block" />

      <section id="home" className="relative overflow-hidden bg-slate-950 pb-24 pt-24 text-white">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-700/35 via-slate-950 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-8">
              <span className="inline-flex items-center rounded-full bg-brand-100/15 px-4 py-2 text-sm uppercase tracking-[0.35em] text-brand-200">
                Elite campus experience
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                A premium university landing page for global ambition.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Build trust with students, invite them into a luxurious campus lifestyle, and showcase VIP alumni success in every section.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/tour" className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-3 text-base font-semibold text-white transition hover:bg-brand-600">
                  Start Virtual Tour
                </Link>
                <Link href="/vip" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/20">
                  VIP Graduates
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Campus showcase</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Immersive spaces for modern learning.</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Admissions, research, sports, and social life all come together in a polished digital experience.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-brand-500/20 to-slate-900/40 p-5">
                    <p className="text-sm uppercase tracking-[0.35em] text-brand-100">Live events</p>
                    <p className="mt-4 text-2xl font-bold text-white">24/7 campus access</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-slate-900/70 p-5">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Industry-ready</p>
                    <p className="mt-4 text-2xl font-bold text-white">Programs with impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-4">
          {stats.map((card) => (
            <article key={card.title} className="rounded-[2rem] border border-slate-200/10 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">{card.title}</p>
              <h3 className="mt-5 text-4xl font-bold text-slate-950">{card.value}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{card.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="campus" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-500 to-slate-900 p-10 text-white shadow-soft">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80">
              Campus tour
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">See the campus from every angle with our 360° experience.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
              Discover lecture halls, libraries, sports facilities and student spaces in a modern, immersive walkthrough.
            </p>
            <Link href="/tour" className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Enter the tour
            </Link>
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-8 shadow-soft">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-brand-200">Luxury living</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Student residences</h3>
                <p className="mt-2 text-sm text-slate-300">Comfort, security and community in every building.</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-brand-200">Modern campuses</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Study spaces</h3>
                <p className="mt-2 text-sm text-slate-300">Advanced facilities for focused learning and research.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="rounded-[2rem] border border-slate-200/10 bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="uppercase tracking-[0.35em] text-brand-600 text-sm">VIP Alumni</p>
              <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Meet our distinguished graduates</h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Discover the university graduates who shaped industry, government and research with their leadership.
              </p>
            </div>
            <Link href="/vip" className="inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              Explore VIP Timeline
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {vipAlumni.map((alumni) => (
              <article key={alumni.name} className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-950 shadow-soft">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    fill
                    src={alumni.image}
                    alt={alumni.name}
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                </div>
                <div className="space-y-2 p-5 bg-slate-950">
                  <h3 className="text-lg font-semibold text-white">{alumni.name}</h3>
                  <p className="text-sm text-slate-400">{alumni.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
