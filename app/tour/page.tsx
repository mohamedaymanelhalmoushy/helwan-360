import TourViewer from '../../components/TourViewer';

export const metadata = {
  title: 'Virtual Tour',
  description: 'Explore the university campus with 360° tour images.',
};

type TourPageProps = {
  searchParams: {
    image?: string;
  };
};

export default function TourPage({ searchParams }: TourPageProps) {
  return (
    <main className="tour-page bg-slate-100 min-h-screen py-16">
      <section className="tour-hero rounded-[2rem] bg-slate-950 p-10 text-white shadow-soft">
        <h1 className="text-3xl font-bold sm:text-4xl">Virtual Campus Tour</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          Discover campus life through immersive 360° campus images. Click any image to open the viewer and explore each space.
        </p>
      </section>
      <section className="tour-viewer rounded-[2rem] bg-white p-8 shadow-soft">
        <TourViewer selectedImage={searchParams.image} />
      </section>
    </main>
  );
}
