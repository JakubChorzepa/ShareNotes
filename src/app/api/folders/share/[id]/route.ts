import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();
  const { id: folderId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userIds } = await request.json();

  if (!userIds || !Array.isArray(userIds)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
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

  const users = await prisma.user.findMany({
    where: { clerkUserId: { in: userIds } },
  });

  if (users.length !== userIds.length) {
    return NextResponse.json(
      { error: 'One or more user IDs are invalid' },
      { status: 400 },
    );
  }

  const sharedUsers = userIds.map(id => ({ folderId, userId: id }));

  console.log(sharedUsers);

  await prisma.folderShare.createMany({
    data: sharedUsers,
    skipDuplicates: true,
  });

  return NextResponse.json(
    { message: 'Folder successfully shared', sharedUsers },
    { status: 200 },
  );
}
