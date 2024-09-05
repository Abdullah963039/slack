import { fetchQuery } from 'convex/nextjs'
import { Metadata } from 'next'
import { redirect, RedirectType } from 'next/navigation'

import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

export async function generateMetadata({
  params,
}: Pick<ChannelIdLayoutProps, 'params'>): Promise<Metadata> {
  try {
    const workspace = await fetchQuery(api.workspaces.getByIdMetadata, {
      id: params.workspaceId as Id<'workspaces'>,
    })
    const channel = await fetchQuery(api.channels.getByIdMetadata, {
      id: params.channelId as Id<'channels'>,
    })

    if (!workspace) redirect('/', RedirectType.replace)
    if (!channel) redirect(`/workspaces/${workspace._id}`, RedirectType.replace)

    return {
      title: `${workspace.name} | ${channel.name}`,
    }
  } catch (error) {
    return { title: 'Something went wrong!' }
  }
}

interface ChannelIdLayoutProps {
  params: { workspaceId: string; channelId: string }
  children: React.ReactNode
}

function ChannelIdLayout({ children }: ChannelIdLayoutProps) {
  return children
}
export default ChannelIdLayout
