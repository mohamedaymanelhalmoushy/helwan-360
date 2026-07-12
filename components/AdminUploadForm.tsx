'use client';

'use client';

import { useState } from 'react';

type AdminUploadFormProps = {
  onUpload?: () => void;
};

export default function AdminUploadForm({ onUpload }: AdminUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setMessage('Please choose a 360 image to upload.');
      return;
    }

    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/360-images', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      setMessage(result.message || 'Upload complete.');
      onUpload?.();
      setFile(null);
    } else {
      setMessage(result.message || 'Upload failed.');
    }

    setUploading(false);
  }

  return (
    <form onSubmit={handleUpload} className="admin-form">
      <label htmlFor="image-upload">360° image file</label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const selectedFile = event.target.files?.[0] ?? null;
          setFile(selectedFile);
        }}
      />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {message && <p className="admin-message">{message}</p>}
    </form>
  );
}
