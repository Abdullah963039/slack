"use client";

import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/create-workspace-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const WorkspaceSwicher = () => {
  const { onOpen } = useCreateWorkspaceModal();
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const { data: workspace, isLoading: workspaceLoading } =
    useGetWorkspaceById(workspaceId);
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

  const filterdWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative size-9 overflow-hidden bg-[#ABABAB] font-semibold text-slate-800 hover:bg-[#ABABAB]/80">
          {workspaceLoading ? (
            <Loader className="size-5 shrink-0 animate-spin" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspaces/${workspaceId}`)}
          className="cursor-pointer flex-col items-start justify-start capitalize"
        >
          {workspace?.name}{" "}
          <span className="text-xs text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {filterdWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="cursor-pointer capitalize"
            onClick={() => router.push(`/workspaces/${workspace._id}`)}
          >
            <div className="relative mr-2 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-lg font-semibold text-white">
              {workspace?.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={onOpen} className="cursor-pointer">
          <div className="relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-[#f2f2f2] text-lg font-semibold text-slate-800">
            <Plus />
          </div>
          Create new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
