import { promises as fs } from 'node:fs';
import path from 'node:path';

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import prisma from '@/lib/db';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'pdfs');

export async function POST(
  request: Request,
  { params }: { params: { folderId: string } },
) {
  const { userId } = await auth();
  const { folderId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userExists = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!userExists) {
    return NextResponse.json(
      { error: 'User not found in database' },
      { status: 404 },
    );
  }

  const folder = await prisma.folder.findUnique({
    where: { id: folderId },
  });

  if (!folder) {
    return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
  }

  if (folder.ownerId !== userId) {
    return NextResponse.json(
      { error: 'You do not have permission to add notes to this folder' },
      { status: 403 },
    );
  }

  const formData = await request.formData();
  const title = formData.get('title')?.toString();
  const pdfFile = formData.get('file') as File | null;

  console.log(title, pdfFile);

  if (!title || title.length > 100) {
    return NextResponse.json(
      { error: 'Title must be between 1 and 100 characters long' },
      { status: 400 },
    );
  }

  if (!pdfFile) {
    return NextResponse.json(
      { error: 'PDF file is required' },
      { status: 400 },
    );
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const fileExtension = path.extname(pdfFile.name);
  const newFileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(UPLOAD_DIR, newFileName);

  const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
  await fs.writeFile(filePath, fileBuffer);

  const pdfUrl = `/uploads/pdfs/${newFileName}`;

  const note = await prisma.note.create({
    data: {
      title,
      pdfUrl,
      folderId,
      ownerId: userId,
    },
  });

  return NextResponse.json(note, { status: 201 });
}
