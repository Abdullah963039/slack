'use client'

import { CreateWorkspaceModal } from '@/features/workspaces/components/create-workspace-modal'
import { PreferencesModal } from '@/features/workspaces/components/preferences-modal'
import { CreateChannelModal } from '@/features/channels/components/create-channel-modal'
import { InviteModal } from '@/features/workspaces/components/invite-modal'

import { ClientProvider } from '@/components/providers/client-provider'

export const ModalsProvider = () => {
  return (
    <ClientProvider>
      <CreateWorkspaceModal />
      <CreateChannelModal />
      <PreferencesModal />
      <InviteModal />
    </ClientProvider>
  )
}
