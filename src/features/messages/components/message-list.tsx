import { useState } from 'react'
import { Loader } from 'lucide-react'
import { differenceInMinutes, format } from 'date-fns'

import { Id } from '@root/convex/_generated/dataModel'
import { Message } from '@/features/messages/components/message'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { formatDateLabel } from '@/lib/utils'

import { GetMessagesReturnType } from '../api/use-get-messages'
import { ConversationHero } from './conversation-hero'
import { ChannelHero } from './channel-hero'

const TIME_THRESHOLD = 5 as const

interface MessageListProps {
  memberName?: string
  memberImage?: string
  channelName?: string
  channelCreationTime?: number
  variant?: 'channel' | 'thread' | 'converstaion'
  data: GetMessagesReturnType | undefined
  loadMore: () => void
  isLoadingMore: boolean
  canLoadMore: boolean
}

export const MessageList = ({
  canLoadMore,
  data,
  isLoadingMore,
  loadMore,
  channelCreationTime,
  channelName,
  memberImage,
  memberName,
  variant,
}: MessageListProps) => {
  const [editingId, setEditingId] = useState<Id<'messages'> | null>(null)

  const workspaceId = useWorkspaceId()
  const { data: currentMember } = useCurrentMember({ workspaceId })

  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime)
      const dateKey = format(date, 'yyyy-MM-dd')

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].unshift(message)

      return groups
    },
    {} as Record<string, typeof data>,
  )

  return (
    <div className="messages-scrollbar flex flex-1 flex-col-reverse overflow-y-auto pb-4">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="relative my-2 text-center">
            <hr className="absolute left-0 right-0 top-1/2 border-t border-gray-300" />
            <span className="relative inline-block rounded-full border border-gray-300 bg-white px-4 py-1 text-xs shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map((message, idx) => {
            const previousMessage = messages[idx - 1]
            const isCompact =
              !!previousMessage &&
              previousMessage.user._id === message.user._id &&
              differenceInMinutes(
                new Date(message._creationTime),
                new Date(previousMessage._creationTime),
              ) < TIME_THRESHOLD

            return (
              <Message
                key={message._id}
                id={message._id}
                memberId={message.member._id}
                authorImage={message.user.image}
                authorName={message.user.name}
                reactions={message.reactions}
                body={message.body}
                image={message.image}
                updatedAt={message.updatedAt}
                createdAt={message._creationTime}
                isAuhtor={message.memberId === currentMember?._id}
                isEditing={editingId === message._id}
                setEditingId={setEditingId}
                hideThreadButton={variant === 'thread'}
                isCompact={isCompact}
                threadCount={message.threadCount}
                threadImage={message.threadImage}
                threadTimestamp={message.threadTimestamp}
                threadName={message.threadName}
              />
            )
          })}
        </div>
      ))}
      <div
        className="h-1"
        ref={(el) => {
          if (el) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting && canLoadMore) {
                  loadMore()
                }
              },
              {
                threshold: 1.0,
              },
            )

            observer.observe(el)
            return () => observer.disconnect()
          }
        }}
      />
      {isLoadingMore && (
        <div className="relative my-2 text-center">
          <hr className="absolute left-0 right-0 top-1/2 border-t border-gray-300" />
          <span className="relative inline-block rounded-full border border-gray-300 bg-white px-4 py-1 text-xs shadow-sm">
            <Loader className="size-4 animate-spin" />
          </span>
        </div>
      )}
      {variant === 'channel' && !!channelName && !!channelCreationTime && (
        <ChannelHero name={channelName} creationTime={channelCreationTime} />
      )}
      {variant === 'converstaion' && (
        <ConversationHero name={memberName} image={memberImage} />
      )}
    </div>
  )
}
