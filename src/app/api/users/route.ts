import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/db';
import { TruncatedUserData } from '@/types/user';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users: TruncatedUserData[] = await prisma.user.findMany({
    select: {
      clerkUserId: true,
      email: true,
      username: true,
    },
  });

  return NextResponse.json(users, { status: 200 });
}
