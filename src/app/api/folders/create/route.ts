import { auth } from '@clerk/nextjs/server';
import { hash } from 'bcryptjs';
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

  const userExists = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!userExists) {
    return NextResponse.json(
      { error: 'User not found in database' },
      { status: 404 },
    );
  }

  const { name, password }: CreateFolderRequest = await request.json();

  if (!name || name.length > 50) {
    return NextResponse.json(
      { error: 'Folder name must be between 1 and 50 characters long' },
      { status: 400 },
    );
  }

  const hashedPassword = password ? await hash(password, 10) : undefined;

  const folder = await prisma.folder.create({
    data: {
      name,
      password: hashedPassword,
      ownerId: userId,
    },
  });

  return NextResponse.json(folder, { status: 201 });
}
