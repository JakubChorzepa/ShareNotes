import { User } from '@prisma/client';

import prisma from '@/lib/db';

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });
    console.log('User created', user);
    return { user };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
}

type GetUserByIdParams = {
  id?: string;
  clerkUserId?: string;
};

export async function getUserById({ id, clerkUserId }: GetUserByIdParams) {
  try {
    if (!id && !clerkUserId) {
      throw new Error('Either id or clerkUserId must be provided');
    }

    const query = id ? { id: id } : { id: clerkUserId };

    const user = await prisma.user.findUnique({
      where: query,
    });

    return { user };
  } catch (error) {
    return { error };
  }
}

export async function updateUserById(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
