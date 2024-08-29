"use client";

import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

import { UserButton } from "@/components/user-button";

import { WorkspaceSwicher } from "./workspace-swicher";
import { SidebarButton } from "./sidebar-button";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#481349] pb-1 pt-[9px]">
      <WorkspaceSwicher />
      <SidebarButton
        icon={Home}
        label="Home"
        active={pathname.includes("workspaces")}
      />
      <SidebarButton icon={MessageSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="mt-auto flex flex-col items-center justify-center gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
};
