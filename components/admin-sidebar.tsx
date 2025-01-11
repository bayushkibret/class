'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Settings, BarChart, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const navigation = [
  {
    title: 'Overview',
    links: [
      { title: 'Dashboard', icon: BarChart, href: '/admin/dashboard' },
      { title: 'Users', icon: Users, href: '/admin/users' },
    ],
  },
  {
    title: 'Settings',
    links: [
      { title: 'General', icon: Settings, href: '/admin/settings' },
      { title: 'Permissions', icon: Shield, href: '/admin/permissions' },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.links.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === link.href}
                    >
                      <Link href={link.href}>
                        <link.icon className="mr-2 h-4 w-4" />
                        <span>{link.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

