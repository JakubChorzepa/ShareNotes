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

type GetUserByIdOrClerkIdParams = {
  id?: string;
  clerkUserId?: string;
};

export async function getUserById({
  id,
  clerkUserId,
}: GetUserByIdOrClerkIdParams) {
  try {
    if (!id && !clerkUserId) {
      throw new Error('Either id or clerkUserId must be provided');
    }

    const query = id ? { id: id } : { clerkUserId: clerkUserId };

    const user = await prisma.user.findUnique({
      where: query,
    });

    return { user };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
}

export async function updateUserById(
  { id, clerkUserId }: GetUserByIdOrClerkIdParams,
  data: Partial<User>,
) {
  if (!id && !clerkUserId) {
    throw new Error('Either id or clerkUserId must be provided');
  }

  const query = id ? { id: id } : { clerkUserId: clerkUserId };

  try {
    const user = await prisma.user.update({
      where: query,
      data,
    });
    return { user };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
}

export async function deleteUserById({
  id,
  clerkUserId,
}: GetUserByIdOrClerkIdParams) {
  if (!id && !clerkUserId) {
    throw new Error('Either id or clerkUserId must be provided');
  }

  const query = id ? { id: id } : { clerkUserId: clerkUserId };

  console.log(query);

  try {
    await prisma.user.delete({
      where: query,
    });
    console.log('User deleted:', id);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(errorMessage);
  }
}
