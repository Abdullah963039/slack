'use client'

import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from 'lucide-react'

import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useGetMembers } from '@/features/members/api/use-get-members'
import { useGetWorkspaceById } from '@/features/workspaces/api/use-get-workspace-by-id'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

import { WorkspaceHeader } from './workspace-header'
import { SidebarItem } from './sidebar-item'
import { WorkspaceSection } from './workspace-section'
import { UserItem } from './user-item'
import { useCreateChannelModal } from '@/features/channels/store/create-channel-modal'

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId()
  const { data: member, isLoading: loadingMemeber } = useCurrentMember({
    workspaceId,
  })
  const { data: workspace, isLoading: loadingWorkspace } =
    useGetWorkspaceById(workspaceId)
  const { data: channels } = useGetChannels({ workspaceId })
  const { data: members } = useGetMembers({ workspaceId })

  const { onOpen: openCreateChannelModal } = useCreateChannelModal()

  if (loadingMemeber || loadingWorkspace)
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#5e2c5f]">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    )
  if (!workspace || !member)
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#5e2c5f]">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-sm text-white">Workspace not found!</p>
      </div>
    )

  return (
    <div className="flex h-full flex-col bg-[#5e2c5f]">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === 'admin'}
      />

      <div className="mt-3 flex flex-col px-2">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Draft & Sent" icon={SendHorizonal} id="drafts" />
      </div>

      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={member.role === 'admin' ? openCreateChannelModal : undefined}
      >
        {channels?.map((channelItem) => (
          <SidebarItem
            key={channelItem._id}
            label={channelItem.name}
            icon={HashIcon}
            id={channelItem._id}
          />
        ))}
      </WorkspaceSection>

      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        onNew={() => {}}
      >
        {members?.map((memberItem) => (
          <UserItem
            key={memberItem._id}
            id={memberItem._id}
            label={memberItem.user.name}
            image={memberItem.user.image}
            variant={memberItem._id === member._id ? 'active' : 'default'}
          />
        ))}
      </WorkspaceSection>
    </div>
  )
}
