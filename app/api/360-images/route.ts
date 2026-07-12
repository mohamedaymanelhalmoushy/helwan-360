import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const uploadPath = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get('image');

  if (!image || typeof image === 'string' || !('arrayBuffer' in image)) {
    return NextResponse.json({ message: 'Invalid image file.' }, { status: 400 });
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = `${Date.now()}-${image.name}`;
  await fs.mkdir(uploadPath, { recursive: true });
  await fs.writeFile(path.join(uploadPath, filename), buffer);

  return NextResponse.json({ message: 'Image uploaded successfully.', file: `/uploads/${filename}` });
}
