import { type WebhookEvent } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

import { createUser, deleteUserById, updateUserById } from '@/lib/users';

export async function POST(request: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local',
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error('Error: Could not verify webhook:', error);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  const eventType = event.type;

  switch (eventType) {
    case 'user.created': {
      const { id, email_addresses, username, image_url } = event.data;
      const email = email_addresses[0]?.email_address;

      if (!id || !email || !username || !image_url) {
        return new Response('Error: Missing user data', {
          status: 400,
        });
      }

      const user = {
        clerkUserId: id,
        email,
        username: username,
        avatarUrl: image_url,
      };

      try {
        await createUser(user as User);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        return new Response(`Error: Could not create user: ${errorMessage}`, {
          status: 500,
        });
      }
      break;
    }

    case 'user.updated': {
      const { id, email_addresses, username, image_url } = event.data;
      const email = email_addresses[0]?.email_address;

      if (!id) {
        return new Response('Error: Missing user ID', {
          status: 400,
        });
      }

      const userUpdate = {
        email,
        username: username || undefined,
        avatarUrl: image_url || undefined,
      };

      try {
        await updateUserById({ clerkUserId: id }, userUpdate);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        return new Response(`Error: Could not update user: ${errorMessage}`, {
          status: 500,
        });
      }
      break;
    }

    case 'user.deleted': {
      const { id } = event.data;

      if (!id) {
        return new Response('Error: Missing user ID', {
          status: 400,
        });
      }

      try {
        await deleteUserById({ clerkUserId: id });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        return new Response(`Error: Could not delete user: ${errorMessage}`, {
          status: 500,
        });
      }
      break;
    }

    default: {
      console.warn(`Unhandled event type: ${eventType}`);
      return new Response('Unhandled event type', { status: 400 });
    }
  }

  return new Response('Webhook received', { status: 200 });
}
