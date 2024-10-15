import dynamic from 'next/dynamic'
import { format, isToday, isYesterday } from 'date-fns'

import { Doc, Id } from '@root/convex/_generated/dataModel'
import { Hint } from '@/components/hint'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Thumbnail } from '@/components/thumbnail'
import { Toolbar } from '@/components/toolbar'
const Renderer = dynamic(() => import('@/components/renderer'), { ssr: false })

interface MessageProps {
  id: Id<'messages'>
  memberId: Id<'members'>
  authorImage?: string
  authorName?: string
  isAuhtor: boolean
  reactions: (Omit<Doc<'reactions'>, 'memberId'> & {
    count: number
    memberIds: Id<'members'>[]
  })[]
  body: Doc<'messages'>['body']
  image?: string | null
  createdAt: Doc<'messages'>['_creationTime']
  updatedAt: Doc<'messages'>['updatedAt']
  isEditing: boolean
  setEditingId: (id: Id<'messages'> | null) => void
  isCompact?: boolean
  hideThreadButton?: boolean
  threadCount?: number
  threadImage?: string
  threadTimestamp?: number
}

export const Message = ({
  body,
  createdAt,
  id,
  isAuhtor,
  isEditing,
  memberId,
  reactions,
  setEditingId,
  updatedAt,
  authorImage,
  authorName = 'Member',
  hideThreadButton,
  image,
  isCompact,
  threadCount,
  threadImage,
  threadTimestamp,
}: MessageProps) => {
  if (isCompact) {
    return (
      <div className="group relative flex flex-col gap-2 p-1.5 px-5 transition hover:bg-gray-100/60">
        <div className="flex items-start gap-2">
          <Hint label={formatFullTime(new Date(createdAt))}>
            <button className="w-10 text-center text-xs leading-[22px] text-muted-foreground opacity-0 hover:underline group-hover:opacity-100">
              {format(new Date(createdAt), 'hh:mm')}
            </button>
          </Hint>
          <div className="flex w-full flex-col">
            <Renderer value={body} />
            <Thumbnail url={image} />

            {!!updatedAt && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col gap-2 p-1.5 px-5 transition hover:bg-gray-100/60">
      <div className="flex items-start gap-2">
        <button>
          <Avatar>
            <AvatarImage src={authorImage} />
            <AvatarFallback className="">
              {authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
        <div className="flex w-full flex-col overflow-hidden">
          <div className="text-sm">
            <button
              className="font-bold text-primary hover:underline"
              onClick={() => {}}
            >
              {authorName}
            </button>
            <span>&nbsp;&nbsp;</span>
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="text-xs text-muted-foreground hover:underline">
                {format(new Date(createdAt), 'h:mm a')}
              </button>
            </Hint>
          </div>
          <Renderer value={body} />
          <Thumbnail url={image} />
          {!!updatedAt && (
            <span className="text-xs text-muted-foreground">(edited)</span>
          )}
        </div>
      </div>
      {!isEditing && (
        <Toolbar
          isAuhtor={isAuhtor}
          isPending={false}
          handleEdit={() => setEditingId(id)}
          handleThread={() => {}}
          handleDelete={() => {}}
          handleReaction={() => {}}
          hideThreadButton={hideThreadButton}
        />
      )}
    </div>
  )
}

function formatFullTime(date: Date) {
  return `${isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MMM d, yyyy')} at ${format(date, 'h:mm:ss a')}`
}
