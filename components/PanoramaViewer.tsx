'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

export default function PanoramaViewer({ url, alt }: { url: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    setError(false);

    async function createViewer() {
      try {
        const mod = await import('photo-sphere-viewer');
        const ViewerClass = (mod as any)?.Viewer ?? (mod as any)?.default?.Viewer ?? (mod as any)?.default;
        if (!ViewerClass) throw new Error('Photo Sphere Viewer unavailable');
        if (cancelled) return;

        instanceRef.current?.destroy();
        instanceRef.current = new ViewerClass({
          container: containerRef.current!,
          panorama: url,
          navbar: ['zoom', 'fullscreen'],
          defaultLong: 0,
          defaultLat: 0,
          loadingImg: undefined,
        });
      } catch (err) {
        if (!cancelled) {
          console.error('Panorama viewer error', err);
          setError(true);
        }
      }
    }

    createViewer();
    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
    };
  }, [url]);

  return (
    <div className="panorama relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-900 p-6 text-center">
          <p className="text-sm text-slate-400">Unable to load the interactive viewer. Preview below.</p>
          <div className="relative h-full max-h-[420px] w-full overflow-hidden rounded-xl">
            <Image src={url} alt={alt} fill className="object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
