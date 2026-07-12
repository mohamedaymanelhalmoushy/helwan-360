'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

type ImageItem = {
  name: string;
  url: string;
};

type TourViewerProps = {
  selectedImage?: string;
};

const defaultImages: ImageItem[] = [
  {
    name: 'Sample Panorama',
    url: '/uploads/sphere.jpg',
  },
];

export default function TourViewer({ selectedImage }: TourViewerProps) {
  const [images, setImages] = useState<ImageItem[]>(defaultImages);
  const [selected, setSelected] = useState<ImageItem>(defaultImages[0]);
  const [viewerError, setViewerError] = useState(false);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const viewerInstance = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    async function loadImages() {
      const response = await fetch('/api/360-images/list');
      const data = await response.json();
      const list: ImageItem[] = Array.isArray(data.images) && data.images.length > 0 ? data.images : defaultImages;

      if (!mounted) return;
      setImages(list);
      const foundImage = selectedImage ? list.find((item: ImageItem) => item.name === selectedImage) : undefined;
      setSelected(foundImage ?? list[0]);
    }

    loadImages();
    return () => {
      mounted = false;
      viewerInstance.current?.destroy();
    };
  }, [selectedImage]);

  useEffect(() => {
    if (!viewerRef.current) return;

    let cancelled = false;
    setViewerError(false);

    async function createViewer(url: string) {
      try {
        const viewerModule = await import('photo-sphere-viewer');
        const ViewerClass = viewerModule?.Viewer ?? viewerModule?.default?.Viewer ?? viewerModule?.default;

        if (!ViewerClass) {
          throw new Error('Unable to resolve Photo Sphere Viewer constructor');
        }

        if (cancelled) return;

        viewerInstance.current?.destroy();
        viewerInstance.current = new ViewerClass({
          container: viewerRef.current!,
          panorama: url,
          navbar: ['autorotate', 'zoom', 'fullscreen'],
          defaultLong: 0,
          defaultLat: 0,
        });
      } catch (error) {
        if (!cancelled) {
          console.error('Photo Sphere Viewer error', error);
          setViewerError(true);
        }
      }
    }

    createViewer(selected.url);

    return () => {
      cancelled = true;
    };
  }, [selected]);

  return (
    <div>
      <div className="tour-list">
        <h2>Available 360° images</h2>
        <div className="tour-images">
          {images.map((image) => (
            <button
              key={image.name}
              className={`tour-image-card ${selected.url === image.url ? 'selected' : ''}`}
              type="button"
              onClick={() => setSelected(image)}
            >
              <strong>{image.name}</strong>
              <span>Open panorama</span>
            </button>
          ))}
        </div>
      </div>

      <div className="panorama" ref={viewerRef}>
        {viewerError && (
          <div className="viewer-fallback">
            <p>Unable to load the interactive viewer. Preview the image below.</p>
            <div className="relative overflow-hidden rounded-[1.25rem]">
              <Image
                src={selected.url}
                alt={selected.name}
                width={1200}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
