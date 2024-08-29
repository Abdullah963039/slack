import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { redirect, RedirectType } from "next/navigation";

import { api } from "@root/convex/_generated/api";

export async function generateMetadata({
  params,
}: Pick<WorkspaceLayoutProps, "params">): Promise<Metadata> {
  const workspaces = await fetchQuery(api.workspaces.get);

  const workspaceName = workspaces.find(
    (workspace) => workspace._id === params.workspaceId,
  )?.name;

  if (!workspaceName) redirect("/", RedirectType.replace);

  return {
    title: `Workspace | ${workspaceName}`,
  };
}

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: { workspaceId: string };
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return children;
}
