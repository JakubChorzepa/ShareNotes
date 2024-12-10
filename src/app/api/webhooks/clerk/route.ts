import { type WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

import prisma from '@/lib/db';

export async function POST(request: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local',
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  let event: WebhookEvent;

  // Verify payload with headers
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

  if (eventType === 'user.created') {
    const { id, email_addresses } = event.data;
    const email = email_addresses[0]?.email_address;

    if (email) {
      try {
        await prisma.user.create({
          data: {
            id,
            email,
          },
        });

        console.log('User added to database:', { id, email });
      } catch (error) {
        console.error('Error saving user to database:', error);
        return new Response('Error saving user to database', {
          status: 500,
        });
      }
    }
    console.log('userId:', event.data.id);
  }

  return new Response('Webhook received', { status: 200 });
}