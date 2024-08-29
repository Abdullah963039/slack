"use client";

import { useGetWorkspaceById } from "@/features/workspaces/api/use-get-workspace-by-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export default function WorkspaceIdPage() {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspaceById(workspaceId);

  return (
    <div className="whitespace-pre-wrap p-6">
      <div>workspaceId: {workspaceId}</div>
    </div>
  );
}
