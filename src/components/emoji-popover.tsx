import { useState } from 'react'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface EmojiPopoverProps {
  children: React.ReactNode
  hint?: string
  onEmojiSelect: (emoji: string) => void
}

export const EmojiPopover = ({
  children,
  onEmojiSelect,
  hint = 'Emoji',
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  function onSelect(emoji: EmojiClickData) {
    onEmojiSelect(emoji.emoji)

    setPopoverOpen(false)

    setTimeout(() => {
      setTooltipOpen(false)
    }, 500)
  }

  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
          delayDuration={50}
        >
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="border border-white/5 bg-black text-white">
            <p className="text-xs font-medium">{hint}</p>
          </TooltipContent>
        </Tooltip>

        <PopoverContent className="w-full border-none p-0 shadow-none">
          <EmojiPicker onEmojiClick={onSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}
