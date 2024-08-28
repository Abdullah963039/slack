import { useQuery } from "convex/react";

import { api } from "@root/convex/_generated/api";

export const useGetWorkspaces = () => {
  const data = useQuery(api.workspaces.get);

  return { data, loading: data === undefined };
};
