import { SignedIn, UserButton } from '@clerk/nextjs';

import { AppSidebar } from '@/components/AppSidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen flex-col">
        <header className="flex w-full items-center justify-between bg-background px-8 py-2 shadow-sm">
          <div className="flex flex-row">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mx-4 h-6" />
          </div>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </header>
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-4">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
