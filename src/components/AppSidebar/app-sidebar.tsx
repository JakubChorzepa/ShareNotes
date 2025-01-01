'use client';

import { Folder, FolderGit2, Home, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
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
    url: '/owned-folders',
    icon: Folder,
  },
  {
    title: 'Udostepnione dla mnie',
    url: '#',
    icon: FolderGit2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4 font-semibold">
        ShareNotes
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {sidebarRoutes.map(route => {
                const isActive = pathname === route.url;

                return (
                  <SidebarMenuItem key={route.title}>
                    <SidebarMenuButton
                      asChild
                      className={`flex w-full items-center gap-2 rounded-md p-2 ${
                        isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Link href={route.url}>
                        <route.icon />
                        <span>{route.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
