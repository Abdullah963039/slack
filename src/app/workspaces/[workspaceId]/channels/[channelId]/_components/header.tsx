import { FaChevronDown } from 'react-icons/fa'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UpdateChannelForm } from '@/features/channels/components/forms/update-channel-form'
import { useDeleteChannel } from '@/features/channels/api/use-delete-channel'
import { useChannelId } from '@/hooks/use-channel-id'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useConfirm } from '@/hooks/use-confirm'


interface HeaderProps {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  const channelId = useChannelId()
  const workspaceId = useWorkspaceId()
  const router = useRouter()

  const [ConfirmDeleteModal, confirmDelete] = useConfirm(
    "Delete this channel",
    'You are about to delete this channel, This action is irreversible!'
  )

  const { mutate: deleteChannel, isPending } = useDeleteChannel()

  async function onDelete() {
    const ok = await confirmDelete()

    if(!ok) return

    deleteChannel({id: channelId}, {
      onSuccess(){
        toast.success("Channel deleted.")
        router.refresh()
        router.replace(`/workspaces/${workspaceId}`)
      }, onError(){
        toast.error("Failed to delete!")
      }
    })
  }

  return (
    <header className="flex h-12 items-center overflow-hidden border-b bg-white px-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-auto overflow-hidden px-2 text-lg font-semibold"
          >
            <span className="truncate">#{title}</span>
            <FaChevronDown className="ml-2 size-2.5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-hidden bg-gray-50 p-0">
          <ConfirmDeleteModal />
          <DialogHeader className="border-b bg-white p-4">
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-2 px-4 pb-4">
            <UpdateChannelForm initialValue={title} />

            <button
              onClick={onDelete}
              className="flex items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 transition hover:bg-gray-50"
            >
              <Trash className="size-4" />
              <p className="text-sm font-semibold">Delete channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}
