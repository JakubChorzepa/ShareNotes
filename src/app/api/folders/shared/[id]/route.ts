import { auth } from '@clerk/nextjs/server';
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
    include: { owner: true },
  });

  if (!folder) {
    return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
  }

  if (folder.ownerId !== userId) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const sharedUsers = await prisma.folderShare.findMany({
    where: { folderId },
    include: {
      user: {
        select: {
          clerkUserId: true,
          email: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  return NextResponse.json(
    sharedUsers.map(share => share.user),
    { status: 200 },
  );
}
