import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sharedFolders = await prisma.folderShare.findMany({
    where: { userId },
    include: { folder: true },
  });

  const folders = sharedFolders.map(sharedFolder => sharedFolder.folder);

  return NextResponse.json(folders, { status: 200 });
}
