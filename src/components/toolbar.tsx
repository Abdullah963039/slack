import {
  MessageSquareTextIcon,
  PencilIcon,
  SmileIcon,
  TrashIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { EmojiPopover } from '@/components/emoji-popover'

interface ToolbarProps {
  isAuhtor: boolean
  isPending: boolean
  handleEdit: () => void
  handleThread: () => void
  handleDelete: () => void
  handleReaction: (value: string) => void
  hideThreadButton?: boolean
}

export const Toolbar = ({
  handleDelete,
  handleEdit,
  handleReaction,
  handleThread,
  isAuhtor,
  isPending,
  hideThreadButton,
}: ToolbarProps) => {
  return (
    <div className="absolute right-5 top-0">
      <div className="rounded-md border bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        <EmojiPopover
          hint="Add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji)}
        >
          <Button variant="ghost" size="icon-sm" disabled={isPending}>
            <SmileIcon className="size-4" />
          </Button>
        </EmojiPopover>

        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button
              onClick={handleThread}
              variant="ghost"
              size="icon-sm"
              disabled={isPending}
            >
              <MessageSquareTextIcon className="size-4" />
            </Button>
          </Hint>
        )}

        {isAuhtor && (
          <Hint label="Edit message">
            <Button
              onClick={handleEdit}
              variant="ghost"
              size="icon-sm"
              disabled={isPending}
            >
              <PencilIcon className="size-4" />
            </Button>
          </Hint>
        )}

        {isAuhtor && (
          <Hint label="Delete message">
            <Button
              onClick={handleDelete}
              variant="ghost"
              size="icon-sm"
              disabled={isPending}
            >
              <TrashIcon className="size-4" />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  )
}
