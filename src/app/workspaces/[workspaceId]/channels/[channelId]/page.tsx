'use client'

import { AlertTriangle, Loader } from 'lucide-react'

import { MessageList } from '@/components/message-list'
import { useGetChannel } from '@/features/channels/api/use-get-channel'
import { useGetMessages } from '@/features/messages/api/use-get-messages'
import { useChannelId } from '@/hooks/use-channel-id'

import { Header } from './_components/header'
import { ChatInput } from './_components/chat-input'

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
  const { results, status, loadMore } = useGetMessages({ channelId })

  if (loadingChannel || status === 'LoadingFirstPage')
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
    <div className="flex h-full flex-col">
      <Header title={channel.name} />
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === 'LoadingMore'}
        canLoadMore={status === 'CanLoadMore'}
        variant="channel"
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  )
}
export default ChannelIdPage
