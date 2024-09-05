import { fetchQuery } from 'convex/nextjs'
import { Metadata } from 'next'
import { redirect, RedirectType } from 'next/navigation'

import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

interface JoinWorkspaceLayoutProps {
  children: React.ReactNode
  params: { workspaceId: string }
}

export async function generateMetadata({
  params,
}: Pick<JoinWorkspaceLayoutProps, 'params'>): Promise<Metadata> {
  const workspace = await fetchQuery(api.workspaces.getByIdMetadata, {
    id: params.workspaceId as Id<'workspaces'>,
  })

  if (!workspace) redirect('/', RedirectType.replace)

  return {
    title: `Join to "${workspace.name}"`,
  }
}

export default function JoinWorkspaceLayout({
  children,
}: JoinWorkspaceLayoutProps) {
  return children
}
