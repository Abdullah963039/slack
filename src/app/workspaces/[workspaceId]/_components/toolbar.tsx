'use client'

import { Info, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useGetWorkspaceById } from '@/features/workspaces/api/use-get-workspace-by-id'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import { useGetMembers } from '@/features/members/api/use-get-members'
import { Id } from '@root/convex/_generated/dataModel'

export const Toolbar = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const workspaceId = useWorkspaceId()
  const { data } = useGetWorkspaceById(workspaceId)

  const { data: channels } = useGetChannels({ workspaceId })
  const { data: members } = useGetMembers({ workspaceId })

  function onNavigate(to: 'channels' | 'members', id: string) {
    router.push(`/workspaces/${workspaceId}/${to}/${id}`)
    setOpen(false)
  }

  return (
    <nav className="flex h-10 items-center justify-between bg-[#481349] p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] shrink grow-[2]">
        <Button
          size="sm"
          className="h-7 w-full justify-start gap-x-2 bg-accent/25 px-2 text-white hover:bg-accent/20"
          onClick={() => setOpen(true)}
        >
          <Search className="size-4" />
          <span className="text-xs">Search {data?.name}</span>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Channels">
              {channels?.map((channel) => (
                <CommandItem
                  key={channel._id}
                  asChild
                  className="cursor-pointer"
                >
                  <Button
                    onClick={() => onNavigate('channels', channel._id)}
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    #{channel.name}
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Members">
              {members?.map((member) => (
                <CommandItem
                  key={member._id}
                  asChild
                  className="cursor-pointer"
                >
                  <Button
                    onClick={() => onNavigate('members', member._id)}
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    {member.user.name}
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <div className="ml-auto flex flex-1 items-center justify-end">
        <Button size="icon-sm" variant="transparent">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  )
}
