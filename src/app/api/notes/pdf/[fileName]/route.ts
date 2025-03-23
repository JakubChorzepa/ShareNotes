import fs from 'node:fs/promises';
import path from 'node:path';

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'pdfs');

export async function GET(
  request: Request,
  { params }: { params: { fileName: string } },
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { fileName } = await params;

  if (!fileName) {
    return NextResponse.json(
      { error: 'File name is required' },
      { status: 400 },
    );
  }

  const filePath = path.join(UPLOAD_DIR, fileName);

  try {
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
