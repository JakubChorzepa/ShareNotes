import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const folders = await prisma.folder.findMany({
    where: { ownerId: userId },
    include: { notes: true, sharedUsers: true },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json(folders, { status: 200 });
}
