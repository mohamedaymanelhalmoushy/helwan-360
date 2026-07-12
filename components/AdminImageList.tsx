'use client';

import { useEffect, useState } from 'react';

type ImageItem = {
  name: string;
  url: string;
};

type AdminImageListProps = {
  refreshTrigger?: number;
};

export default function AdminImageList({ refreshTrigger = 0 }: AdminImageListProps) {
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    fetch('/api/360-images/list')
      .then((response) => response.json())
      .then((data) => setImages(data.images || []));
  }, [refreshTrigger]);

  return (
    <div className="image-list">
      <h2>Uploaded 360° images</h2>
      {images.length === 0 ? (
        <p>No images have been uploaded yet.</p>
      ) : (
        <ul>
          {images.map((image) => (
            <li key={image.name}>
              <a href={image.url} target="_blank" rel="noreferrer">
                {image.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
