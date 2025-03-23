import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';
import { FolderWithNoteCount } from '@/types/folder';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sharedFolders = await prisma.folder.findMany({
      where: {
        sharedUsers: {
          some: { userId: userId },
        },
      },
      include: {
        notes: true,
        sharedUsers: {
          include: {
            user: {
              select: { id: true, username: true, email: true },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const foldersWithNoteCount: FolderWithNoteCount[] = sharedFolders.map(
      folder => ({
        ...folder,
        noteCount: folder.notes.length,
      }),
    );

    return NextResponse.json(foldersWithNoteCount, { status: 200 });
  } catch (error) {
    console.error('Error fetching shared folders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
