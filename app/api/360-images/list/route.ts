import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const uploadPath = path.join(process.cwd(), 'public', 'uploads');

export async function GET() {
  try {
    const files = await fs.readdir(uploadPath);
    const images = files.map((file) => ({
      name: file,
      url: `/uploads/${file}`,
    }));
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ images: [] });
  }
}
