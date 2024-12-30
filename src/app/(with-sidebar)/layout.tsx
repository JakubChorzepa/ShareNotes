import { Protect } from '@clerk/nextjs';

import { AppSidebar } from '@/components/AppSidebar/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Protect>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div>{children}</div>
      </SidebarProvider>
    </Protect>
  );
}
