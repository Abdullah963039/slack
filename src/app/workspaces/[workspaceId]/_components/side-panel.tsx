'use client'

import { Id } from '@root/convex/_generated/dataModel'

import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { usePanel } from '@/hooks/use-panel'
import { Thread } from '@/features/messages/components/thread'
import { Profile } from '@/features/members/components/profile'
import { Loader } from '@/components/loader'

export const SidePanel = () => {
  const { parentMessageId, onClose, profileMemberId } = usePanel()

  const showPannel = !!parentMessageId || !!profileMemberId

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
        ) : profileMemberId != null ? (
          <Profile
            memberId={profileMemberId as Id<'members'>}
            onClose={onClose}
          />
        ) : (
          <Loader />
        )}
      </ResizablePanel>
    </>
  )
}
