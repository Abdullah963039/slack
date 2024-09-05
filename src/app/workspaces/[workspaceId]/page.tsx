'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { Loader, TriangleAlert } from 'lucide-react'

import { useCreateChannelModal } from '@/features/channels/store/create-channel-modal'
import { useGetWorkspaceById } from '@/features/workspaces/api/use-get-workspace-by-id'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

export default function WorkspaceIdPage() {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { onOpen, isOpen } = useCreateChannelModal()

  const { data: workspace, isLoading: loadingWorkspace } =
    useGetWorkspaceById(workspaceId)
  const { data: channels, isLoading: loadingChannels } = useGetChannels({
    workspaceId,
  })
  const { data: member, isLoading: loadingMember } = useCurrentMember({
    workspaceId,
  })

  const channelId = useMemo(() => channels?.[0]?._id, [channels])
  const isAdmin = useMemo(() => member?.role == 'admin', [member?.role])

  useEffect(() => {
    if (
      loadingChannels ||
      loadingWorkspace ||
      loadingMember ||
      !member ||
      !workspace
    )
      return

    if (channelId) {
      router.replace(`/workspaces/${workspaceId}/channels/${channelId}`)
    } else if (!isOpen && isAdmin) {
      onOpen()
    }
  }, [
    channelId,
    member,
    loadingMember,
    isAdmin,
    loadingChannels,
    loadingWorkspace,
    workspace,
    router,
    isOpen,
    onOpen,
  ])

  if (loadingWorkspace || loadingChannels)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )

  if (!workspace)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found!
        </span>
      </div>
    )

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">No channel found!</span>
    </div>
  )
}
