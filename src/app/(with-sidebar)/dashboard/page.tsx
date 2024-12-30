import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

export default async function DashboardPage() {
  const user = await currentUser();

  console.log(user);

  return (
    <div className="flex w-full content-center justify-center text-xl">
      Dashboard
    </div>
  );
}
