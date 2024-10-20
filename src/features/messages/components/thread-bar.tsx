import { formatDistanceToNow } from 'date-fns'
import { ChevronRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ThreadBarProps {
  count?: number
  image?: string
  timestamp?: number
  name?: string
  onClick?: () => void
}

export const ThreadBar = ({
  count,
  image,
  onClick,
  timestamp,
  name = 'Member',
}: ThreadBarProps) => {
  if (!count || !timestamp) return null

  return (
    <button
      className="group/thread-bar flex max-w-[600px] items-center justify-start rounded-md border border-transparent p-1 transition hover:border-border hover:bg-white"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="size-6 shrink-0">
          <AvatarImage src={image} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="truncate text-xs font-bold text-sky-700 hover:underline">
          {count} {count > 1 ? 'replies' : 'reply'}
        </span>
        <span className="block truncate text-xs text-muted-foreground group-hover/thread-bar:hidden">
          Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
        <span className="hidden truncate text-xs text-muted-foreground group-hover/thread-bar:block">
          View thread
        </span>
      </div>
      <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/thread-bar:opacity-100" />
    </button>
  )
}
