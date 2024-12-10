import { Folder, FolderGit2, Home, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ShareNotes</SidebarGroupLabel>
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
    </Sidebar>
  );
}
