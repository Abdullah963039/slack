import { useQuery } from "convex/react";

import { api } from "@root/convex/_generated/api";
import { Id } from "@root/convex/_generated/dataModel";

interface UseCurrentMemberProps {
  workspaceId: Id<"workspaces">;
}

export const useCurrentMember = ({ workspaceId }: UseCurrentMemberProps) => {
  const data = useQuery(api.members.current, { workspaceId });

  return { data, isLoading: data === undefined };
};
