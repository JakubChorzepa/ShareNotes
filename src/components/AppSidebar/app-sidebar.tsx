import { SignedIn, UserButton } from '@clerk/nextjs';
import { Folder, FolderGit2, Home, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type SidebarRoute = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const sidebarRoutes: SidebarRoute[] = [
  {
    title: 'Strona główna',
    url: '/',
    icon: Home,
  },
  {
    title: 'Moje foldery',
    url: '#',
    icon: Folder,
  },
  {
    title: 'Udostepnione dla mnie',
    url: '#',
    icon: FolderGit2,
  },
];

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>ShareNotes</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarRoutes.map(sidebarRoute => (
                <SidebarMenuItem key={sidebarRoute.title}>
                  <SidebarMenuButton asChild>
                    <Link href={sidebarRoute.url}>
                      <sidebarRoute.icon />
                      <span>{sidebarRoute.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignedIn>
          <div className="flex h-full w-full flex-row content-center items-center gap-2 p-4">
            <UserButton showName />
          </div>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
