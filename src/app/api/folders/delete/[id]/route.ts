import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();
  const { id: folderId } = await params;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const folder = await prisma.folder.findUnique({
    where: { id: folderId },
  });

  if (!folder) {
    return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
  }

  if (folder.ownerId !== userId) {
    return NextResponse.json(
      { error: 'You are not authorized to delete this folder' },
      { status: 403 },
    );
  }

  try {
    await prisma.folder.delete({
      where: { id: folderId },
    });

    return NextResponse.json(
      { message: 'Folder deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting folder:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the folder' },
      { status: 500 },
    );
  }
}
