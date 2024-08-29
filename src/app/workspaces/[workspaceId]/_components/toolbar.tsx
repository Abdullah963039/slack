"use client";

import { Info, Search } from "lucide-react";

import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceById(workspaceId);

  return (
    <nav className="flex h-10 items-center justify-between bg-[#481349] p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] shrink grow-[2]">
        <Button
          size="sm"
          className="h-7 w-full justify-start gap-x-2 bg-accent/25 px-2 text-white hover:bg-accent/20"
        >
          <Search className="size-4" />
          <span className="text-xs">Search {data?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex flex-1 items-center justify-end">
        <Button size="icon-sm" variant="transparent">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
