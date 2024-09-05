import { Metadata } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { redirect, RedirectType } from 'next/navigation'

import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

import { Toolbar } from './_components/toolbar'
import { Sidebar } from './_components/sidebar'
import { WorkspaceSidebar } from './_components/workspace-sidebar'

export async function generateMetadata({
  params,
}: Pick<WorkspaceLayoutProps, 'params'>): Promise<Metadata> {
  try {
    const workspace = await fetchQuery(api.workspaces.getByIdMetadata, {
      id: params.workspaceId as Id<'workspaces'>,
    })

    if (!workspace) redirect('/', RedirectType.replace)

    return {
      title: `Workspace | ${workspace.name}`,
    }
  } catch (error) {
    return { title: 'Something went wrong!' }
  }
}

interface WorkspaceLayoutProps {
  children: React.ReactNode
  params: { workspaceId: string }
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="slack-workspace-layout"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5e2c5f]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
