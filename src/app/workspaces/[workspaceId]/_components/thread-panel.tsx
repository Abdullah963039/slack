'use client'

import { LoaderIcon } from 'lucide-react'

import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { usePanel } from '@/hooks/use-panel'
import { Id } from '@root/convex/_generated/dataModel'
import { Thread } from '@/features/messages/components/thread'

export const ThreadPanel = () => {
  const { parentMessageId, onClose } = usePanel()

  const showPannel = !!parentMessageId

  if (!showPannel) return null

  return (
    <>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={20} defaultSize={29}>
        {parentMessageId !== null ? (
          <Thread
            messageId={parentMessageId as Id<'messages'>}
            onClose={onClose}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </ResizablePanel>
    </>
  )
}
