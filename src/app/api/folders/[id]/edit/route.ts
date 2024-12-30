import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// @ alias not working - need investigation
import prisma from '../../../../../lib/db';

interface EditFolderRequest {
  name?: string;
  password?: string;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, password }: EditFolderRequest = await request.json();
  const { id: folderId } = params;

  const folder = await prisma.folder.findUnique({ where: { id: folderId } });
  if (!folder || folder.ownerId !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updatedFolder = await prisma.folder.update({
    where: { id: folderId },
    data: { name: name, password: password },
  });

  return NextResponse.json(folder, { status: 200 });
}
