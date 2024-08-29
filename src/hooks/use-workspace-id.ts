import { useParams } from "next/navigation";

import { Id } from "@root/convex/_generated/dataModel";

export const useWorkspaceId = () => {
  const params = useParams() as { workspaceId: string };

  return params.workspaceId as Id<"workspaces">;
};
