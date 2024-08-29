"use client";

import { AlertTriangle, Loader } from "lucide-react";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { WorkspaceHeader } from "./workspace-header";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: loadingMemeber } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: loadingWorkspace } =
    useGetWorkspaceById(workspaceId);

  if (loadingMemeber || loadingWorkspace)
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#5e2c5f]">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  if (!workspace || !member)
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#5e2c5f]">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-sm text-white">Workspace not found!</p>
      </div>
    );

  return (
    <div className="flex h-full flex-col bg-[#5e2c5f]">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
    </div>
  );
};
