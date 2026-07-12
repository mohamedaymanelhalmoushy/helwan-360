import Image from 'next/image';
import Link from 'next/link';

const vipGraduates = [
  {
    year: '1998',
    name: 'Dr. Amina Hassan',
    role: 'Minister of Education',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    summary: 'Led national education reform and built strategic university partnerships.',
  },
  {
    year: '2005',
    name: 'Eng. Omar El-Sayed',
    role: 'Technology CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    summary: 'Founded a global technology group delivering innovation across MENA.',
  },
  {
    year: '2012',
    name: 'Prof. Sara AbdelRahman',
    role: 'Research Fellow',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    summary: 'Won international awards for sustainable urban development research.',
  },
  {
    year: '2018',
    name: 'Mr. Khaled Youssef',
    role: 'Social Impact Leader',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    summary: 'Built social enterprise programs and supported alumni mentorship networks.',
  },
];

export default function VIPPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <section className="bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.18),transparent_30%),#020617] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl space-y-6 rounded-[2rem] bg-slate-900/90 p-12 shadow-soft ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">VIP Alumni</p>
            <h1 className="text-4xl font-extrabold sm:text-5xl">Meet the graduates who shaped HNU and the region.</h1>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              Discover how our VIP alumni advanced education, technology, research and social impact with Helwan National University as their foundation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                Back to overview
              </Link>
              <Link href="/tour" className="inline-flex rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400">
                Visit campus tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-brand-500/20" />
          <div className="space-y-12">
            {vipGraduates.map((graduate, index) => (
              <article
                key={graduate.name}
                className={`relative rounded-[2rem] border border-slate-800/80 bg-slate-900/95 p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-xl lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense lg:grid-cols-[1.05fr_0.95fr]' : ''}`}
              >
                <div className="flex items-start gap-5 lg:col-span-1">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-500 text-2xl font-bold text-slate-950 shadow-lg">
                    {graduate.year.slice(-2)}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-brand-300">{graduate.role}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">{graduate.name}</h2>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-6 lg:mt-0 lg:col-span-1">
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 shadow-xl h-80">
                    <Image
                      fill
                      src={graduate.image}
                      alt={graduate.name}
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{graduate.summary}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center rounded-full bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-200">
                      Alumni timeline
                    </span>
                    <Link href="/tour" className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                      Explore campus
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
