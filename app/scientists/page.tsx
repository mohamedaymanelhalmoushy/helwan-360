import Image from 'next/image';
import Link from 'next/link';

const scientists = [
  {
    name: 'Prof. Samir El-Baz',
    field: 'Environmental Engineering',
    bio: 'Pioneered sustainable urban water solutions and research partnerships across the region.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dr. Laila Mansour',
    field: 'Materials Science',
    bio: 'Research leader in advanced construction materials and smart campus infrastructure.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Prof. Ahmed Nour',
    field: 'Artificial Intelligence',
    bio: 'Developed AI systems for campus safety, learning analytics, and smart mobility.',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
  },
];

export default function ScientistsPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <section className="bg-slate-900/90 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900/95 p-14 shadow-soft ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Our scientists</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Research leaders powering campus innovation.</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              Meet the professors and research faculty working on applied science, AI, advanced materials, and sustainable campus development.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {scientists.map((scientist) => (
            <article key={scientist.name} className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-72 overflow-hidden rounded-[1.75rem] bg-slate-950">
                <Image
                  fill
                  src={scientist.image}
                  alt={scientist.name}
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="mt-6 space-y-4">
                <h2 className="text-2xl font-semibold text-white">{scientist.name}</h2>
                <p className="text-sm uppercase tracking-[0.35em] text-brand-300">{scientist.field}</p>
                <p className="text-sm leading-7 text-slate-300">{scientist.bio}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">Want to know more?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                Explore the university’s research output, faculty achievements, and how our campus supports science and innovation.
              </p>
            </div>
            <Link href="/vip" className="inline-flex rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
              See VIP graduates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
