import './globals.css';

import { plPL } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Share Notes',
  description: 'Share your notes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      localization={plPL}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          <main className="flex min-h-screen items-center justify-center">
            {children}
          </main>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
