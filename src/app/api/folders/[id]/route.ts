import { auth } from '@clerk/nextjs/server';
import { compare } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();
  const { id: folderId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const folder = await prisma.folder.findUnique({
    where: { id: folderId },
    include: {
      owner: true,
      sharedUsers: {
        include: {
          user: true,
        },
      },
      notes: true, // Dołączyć notatki do folderu
    },
  });

  if (!folder) {
    return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
  }

  const isOwner = folder.ownerId === userId;
  const isSharedWithUser = folder.sharedUsers.some(
    share => share.userId === userId,
  );

  if (!isOwner && !isSharedWithUser) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  if (folder.password) {
    return NextResponse.json(
      { error: 'Folder requires a password' },
      { status: 401 },
    );
  }

  return NextResponse.json(folder, { status: 200 }); // Zwracamy folder wraz z notatkami
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();
  const { id: folderId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { password } = await request.json();
  const folder = await prisma.folder.findUnique({
    where: { id: folderId },
    include: {
      owner: true,
      sharedUsers: {
        include: {
          user: true,
        },
      },
      notes: true, // Dołączyć notatki do folderu
    },
  });

  if (!folder || !folder.password) {
    return NextResponse.json(
      { error: 'Invalid folder or password not set' },
      { status: 404 },
    );
  }

  const isPasswordCorrect = await compare(password, folder.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 403 });
  }

  return NextResponse.json(folder, { status: 200 });
}
