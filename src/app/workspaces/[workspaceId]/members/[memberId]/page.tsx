'use client'

import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

import { Id } from '@root/convex/_generated/dataModel'

import { useCreateOrGetConversation } from '@/features/conversations/api/use-create-or-get-conversation'
import { useMemberId } from '@/hooks/use-member-id'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Loader } from '@/components/loader'

import { Conversation } from './_components/conversation'

export default function MemberIdPage() {
  const workspaceId = useWorkspaceId()
  const memberId = useMemberId()

  const [conversationId, setConversationId] =
    useState<Id<'conversations'> | null>(null)

  const { mutate, isPending } = useCreateOrGetConversation()

  useEffect(() => {
    mutate(
      { memberId, workspaceId },
      {
        onSuccess(id) {
          setConversationId(id)
        },
        onError() {
          toast.error('Failed to created or get conversation.')
          setConversationId(null)
        },
      },
    )
  }, [memberId, workspaceId, mutate])

  if (isPending) return <Loader />

  if (conversationId == null)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Conversation not found.
        </span>
      </div>
    )

  return <Conversation id={conversationId} />
}
