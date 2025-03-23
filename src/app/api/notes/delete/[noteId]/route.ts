import { promises as fs } from 'node:fs';
import path from 'node:path';

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'pdfs');

export async function DELETE(
  request: Request,
  { params }: { params: { noteId: string } },
) {
  const { userId } = await auth();
  const { noteId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: {
      folder: true,
    },
  });

  if (!note) {
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }

  const folder = note.folder;
  if (!folder) {
    return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
  }

  const isOwner = note.ownerId === userId;
  const isFolderOwner = folder.ownerId === userId;

  if (!isOwner && !isFolderOwner) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const filePath = path.join(UPLOAD_DIR, path.basename(note.pdfUrl));
    await fs.unlink(filePath);

    await prisma.note.delete({
      where: { id: noteId },
    });

    return NextResponse.json(
      { message: 'Note deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
