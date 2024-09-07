'use client'

import { AlertTriangle, Loader } from 'lucide-react'

import { useGetChannel } from '@/features/channels/api/use-get-channel'
import { useChannelId } from '@/hooks/use-channel-id'

import { Header } from './_components/header'

interface ChannelIdPageProps {
  params: {
    workspaceId: string
    channelId: string
  }
}

function ChannelIdPage({}: ChannelIdPageProps) {
  const channelId = useChannelId()
  const { data: channel, isLoading: loadingChannel } = useGetChannel({
    channelId,
  })

  if (loadingChannel)
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    )

  if (!channel)
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-2">
        <AlertTriangle className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Channel not found!
        </span>
      </div>
    )

  return (
    <div>
      <Header title={channel.name} />
    </div>
  )
}
export default ChannelIdPage
