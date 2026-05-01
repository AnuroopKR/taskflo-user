"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Home, CheckSquare, Settings, LogOut } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="bg-[#fffdf5]  border-r w-64">
      {/* Logo */}
      <SidebarHeader className="px-6 py-5 text-xl font-bold flex items-center gap-2">
        <span className="text-yellow-500">●</span>
        TaskFlow
      </SidebarHeader>

      {/* Profile */}
      <div className="px-4 mb-4">
        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center text-center">
          <Image
            src="/avatar.png"
            alt="User"
            width={60}
            height={60}
            className="rounded-full mb-2"
          />
          <p className="font-semibold text-gray-800">John Doe</p>
          <p className="text-sm text-gray-500">Manager</p>
          <p className="text-xs text-gray-400">john@email.com</p>
        </div>
      </div>

      {/* Content */}
      <SidebarContent className="px-2">
        {/* Main */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-gray-400 text-xs">
            MAIN
          </SidebarGroupLabel>

          <SidebarMenu>
            <Link href="/dashboard">
              <SidebarMenuItem>
                <SidebarMenuButton className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg bg-yellow-50 text-yellow-700 font-medium">
                  <Home className="w-4 h-4" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            <Link href="/dashboard/projects">
              <SidebarMenuItem>
                <SidebarMenuButton className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600">
                  <CheckSquare className="w-4 h-4" />
                  Project
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            <Link href="/dashboard/employees" className="cursor-pointer">
              <SidebarMenuItem>
                <SidebarMenuButton className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600">
                  <CheckSquare className="w-4 h-4" />
                  Employees
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
            <Link href="/dashboard/tasks">
              <SidebarMenuItem>
                <SidebarMenuButton className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600">
                  <CheckSquare className="w-4 h-4" />
                  Tasks
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          </SidebarMenu>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-gray-400 text-xs mt-4">
            SETTINGS
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <Settings className="w-4 h-4" />
                <Link href="/settings">Settings</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-3 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-500">
              <LogOut className="w-4 h-4" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
