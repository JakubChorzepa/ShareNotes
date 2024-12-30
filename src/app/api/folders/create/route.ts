import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

interface CreateFolderRequest {
  name: string;
  password?: string;
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, password }: CreateFolderRequest = await request.json();

  const folder = await prisma.folder.create({
    data: {
      name,
      password,
      ownerId: userId,
    },
  });

  return NextResponse.json(folder, { status: 201 });
}
