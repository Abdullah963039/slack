import { CopyIcon, RefreshCcw } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useConfirm } from '@/hooks/use-confirm'
import { cn } from '@/lib/utils'

import { useNewJoinCode } from '../api/use-new-join-code'
import { useInviteModal } from '../store/invite-modal'

export const InviteModal = () => {
  const { isOpen, onClose, joinCode, updateCode } = useInviteModal()
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useNewJoinCode()
  const [ConfimDialog, confirm] = useConfirm(
    'Are you sure?',
    'This will deactivate the current invite code and generate new one.',
  )

  function onCopy() {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success('Invite link copied to clipboard.')
    })
  }

  async function onNewCode() {
    const ok = await confirm()

    if (!ok) return

    mutate(
      { workspaceId },
      {
        onSuccess(code) {
          updateCode(code!)
          toast.success('Invite code regenerated.')
        },
        onError(error) {
          toast.error('Failed to regenerate new code!')
        },
      },
    )
  }

  return (
    <>
      <ConfimDialog />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to your workspace</DialogTitle>
            <DialogDescription>
              Use the code below to invite people to your workspace
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-y-4 py-10">
            <p
              className={cn(
                'font-mono text-4xl font-bold uppercase tracking-widest',
                isPending && 'select-none opacity-50',
              )}
            >
              {joinCode}
            </p>
            <Button
              disabled={isPending}
              onClick={onCopy}
              variant="ghost"
              size="sm"
            >
              Copy link
              <CopyIcon className="ml-2 size-4" />
            </Button>
          </div>
          <div className="flex w-full items-center justify-between">
            <Button disabled={isPending} onClick={onNewCode} variant="outline">
              New Code
              <RefreshCcw
                className={cn('ml-2 size-4', isPending && 'animate-spin')}
              />
            </Button>
            <DialogClose asChild disabled={isPending}>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
