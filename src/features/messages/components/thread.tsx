import { useState } from 'react'
import { AlertTriangle, LoaderIcon, XIcon } from 'lucide-react'

import { Id } from '@root/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { Message } from '@/components/message'
import { useGetMessage } from '@/features/messages/api/use-get-message'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

interface ThreadProps {
  messageId: Id<'messages'>
  onClose: () => void
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
  const [editingId, setEditingId] = useState<Id<'messages'> | null>(null)

  const { data: message, isLoading: isLoadingMessage } = useGetMessage({
    id: messageId,
  })
  const workspaceId = useWorkspaceId()
  const { data: currentMember } = useCurrentMember({ workspaceId })

  if (isLoadingMessage) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-12 items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} variant="ghost" size="icon-sm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        <div className="flex h-full items-center justify-center">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-12 items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} variant="ghost" size="icon-sm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Message not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 items-center justify-between border-b px-4">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={onClose} variant="ghost" size="icon-sm">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>

      <Message
        hideThreadButton
        memberId={message.memberId}
        authorImage={message.user.image}
        authorName={message.user.name}
        isAuhtor={message.memberId === currentMember?._id}
        body={message.body}
        image={message.image}
        createdAt={message._creationTime}
        updatedAt={message.updatedAt}
        id={message._id}
        reactions={message.reactions}
        isEditing={editingId === message._id}
        setEditingId={setEditingId}
      />
    </div>
  )
}
