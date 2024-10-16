import { toast } from 'sonner'
import dynamic from 'next/dynamic'
import { format, isToday, isYesterday } from 'date-fns'

import { Doc, Id } from '@root/convex/_generated/dataModel'
import { Hint } from '@/components/hint'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Thumbnail } from '@/components/thumbnail'
import { Toolbar } from '@/components/toolbar'
import { useUpdateMessage } from '@/features/messages/api/use-update-message'
import { cn } from '@/lib/utils'
import { useDeleteMessage } from '@/features/messages/api/use-delete-message'
import { useConfirm } from '@/hooks/use-confirm'
import { useToggleReaction } from '@/features/reactions/api/use-toggle-reaction'
import { Reactions } from '@/components/reactions'
import { usePanel } from '@/hooks/use-panel'
import { ThreadBar } from '@/components/thread-bar'
const Renderer = dynamic(() => import('@/components/renderer'), { ssr: false })
const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

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
  threadName?: string
}

export const Message = ({
  body,
  createdAt,
  id,
  isAuhtor,
  isEditing,
  threadName,
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
  const [ConfirmDeleteMessageDialog, confirmDeleteMessage] = useConfirm(
    'Delete Message',
    'Are you sure you want to delete this message? This cannot be undone.',
  )
  const { onOpenMessage, onClose, parentMessageId, onOpenProfile } = usePanel()

  const { mutate: updateMessage, isPending: isUpdatingMessage } =
    useUpdateMessage()
  const { mutate: deleteMessage, isPending: isDeletingMessage } =
    useDeleteMessage()
  const { mutate: toggleReaction, isPending: isTogglingReaction } =
    useToggleReaction()

  const isPending = isUpdatingMessage || isDeletingMessage || isTogglingReaction

  function handleUpdateMessage({ body }: { body: string }) {
    updateMessage(
      { id, body },
      {
        onSuccess() {
          toast.success('Message updated')
          setEditingId(null)
        },
        onError() {
          toast.error('Failed to update message')
        },
      },
    )
  }

  async function handleDeleteMessage() {
    const ok = await confirmDeleteMessage()

    if (!ok) return

    deleteMessage(
      { id },
      {
        onSuccess() {
          toast.success('Message deleted')

          if (parentMessageId === id) {
            onClose()
          }
        },
        onError() {
          toast.error('Failed to delete message.')
        },
      },
    )
  }

  function handleReaction(value: string) {
    toggleReaction(
      { messageId: id, value },
      {
        onError() {
          toast.error('Failed to toggle reaction.')
        },
      },
    )
  }

  function openProfile() {
    onOpenProfile(memberId)
  }

  if (isCompact) {
    return (
      <>
        <div
          className={cn(
            'group relative flex flex-col gap-2 p-1.5 px-5 transition hover:bg-gray-100/60',
            isEditing && 'bg-[#f2c74433] hover:bg-[#f2c74433]',
            isDeletingMessage &&
              'origin-bottom scale-y-0 transform transition-all duration-200',
          )}
        >
          <div className="flex items-start gap-2">
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="w-10 text-center text-xs leading-[22px] text-muted-foreground opacity-0 hover:underline group-hover:opacity-100">
                {format(new Date(createdAt), 'hh:mm')}
              </button>
            </Hint>
            {isEditing ? (
              <div className="size-full">
                <Editor
                  onSubmit={handleUpdateMessage}
                  disabled={isPending}
                  defaultValue={JSON.parse(body)}
                  onCancel={() => setEditingId(null)}
                  variant="update"
                />
              </div>
            ) : (
              <div className="flex w-full flex-col">
                <Renderer value={body} />
                <Thumbnail url={image} />

                {!!updatedAt && (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                )}
                <Reactions data={reactions} onChange={handleReaction} />
                <ThreadBar
                  count={threadCount}
                  image={threadImage}
                  timestamp={threadTimestamp}
                  name={threadName}
                  onClick={() => onOpenMessage(id)}
                />
              </div>
            )}
          </div>
          {!isEditing && (
            <Toolbar
              isAuhtor={isAuhtor}
              isPending={isPending}
              handleEdit={() => setEditingId(id)}
              handleThread={() => onOpenMessage(id)}
              handleDelete={handleDeleteMessage}
              handleReaction={handleReaction}
              hideThreadButton={hideThreadButton}
            />
          )}
        </div>
        <ConfirmDeleteMessageDialog />
      </>
    )
  }

  return (
    <>
      <div
        className={cn(
          'group relative flex flex-col gap-2 p-1.5 px-5 transition hover:bg-gray-100/60',
          isEditing && 'bg-[#f2c74433] hover:bg-[#f2c74433]',
          isDeletingMessage &&
            'origin-bottom scale-y-0 transform transition-all duration-200',
        )}
      >
        <div className="flex items-start gap-2">
          <button onClick={openProfile}>
            <Avatar>
              <AvatarImage src={authorImage} />
              <AvatarFallback className="">
                {authorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
          {isEditing ? (
            <div className="size-full">
              <Editor
                onSubmit={handleUpdateMessage}
                disabled={isPending}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                variant="update"
              />
            </div>
          ) : (
            <div className="flex w-full flex-col overflow-hidden">
              <div className="text-sm">
                <button
                  className="font-bold text-primary hover:underline"
                  onClick={openProfile}
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
              <Reactions data={reactions} onChange={handleReaction} />
              <ThreadBar
                count={threadCount}
                image={threadImage}
                timestamp={threadTimestamp}
                onClick={() => onOpenMessage(id)}
                name={threadName}
              />
            </div>
          )}
        </div>
        {!isEditing && (
          <Toolbar
            isAuhtor={isAuhtor}
            isPending={isPending}
            handleEdit={() => setEditingId(id)}
            handleThread={() => onOpenMessage(id)}
            handleDelete={handleDeleteMessage}
            handleReaction={handleReaction}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
      <ConfirmDeleteMessageDialog />
    </>
  )
}

function formatFullTime(date: Date) {
  return `${isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MMM d, yyyy')} at ${format(date, 'h:mm:ss a')}`
}
