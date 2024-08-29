import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { redirect, RedirectType } from "next/navigation";

import { api } from "@root/convex/_generated/api";
import { Id } from "@root/convex/_generated/dataModel";

import { Toolbar } from "./_components/toolbar";

export async function generateMetadata({
  params,
}: Pick<WorkspaceLayoutProps, "params">): Promise<Metadata> {
  const workspace = await fetchQuery(api.workspaces.getById, {
    id: params.workspaceId as Id<"workspaces">,
  });

  if (!workspace) redirect("/", RedirectType.replace);

  return {
    title: `Workspace | ${workspace.name}`,
  };
}

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: { workspaceId: string };
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <div className="h-full">
      <Toolbar />
      {children}
    </div>
  );
}
