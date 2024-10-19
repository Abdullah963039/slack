import {
  AlertTriangle,
  ChevronDownIcon,
  LoaderIcon,
  MailIcon,
  XIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Id } from '@root/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useConfirm } from '@/hooks/use-confirm'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu'

import { useGetMember } from '../api/use-get-member'
import { useUpdateMember } from '../api/use-update-member'
import { useDeleteMember } from '../api/use-delete-member'
import { useCurrentMember } from '../api/use-current-member'

interface ProfileProps {
  memberId: Id<'members'>
  onClose: () => void
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {
  const workspaceId = useWorkspaceId()
  const router = useRouter()

  //* Confirmation modals
  const [LeaveDialog, confirmLeave] = useConfirm(
    'Leave workspace',
    'Are you sure you want to leave this workspace?',
  )
  const [RemoveDialog, confirmRemove] = useConfirm(
    'Remove member',
    'Are you sure you want to remove this member?',
  )
  const [UpdateDialog, confirmUpdate] = useConfirm(
    'Change role',
    "Are you sure to want to change this member's role?",
  )

  //* Queries
  const { data: currentMember, isLoading: loadingCurrentMember } =
    useCurrentMember({ workspaceId })
  const { data: member, isLoading: loadingMember } = useGetMember({
    id: memberId,
  })

  //* Mutations
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember()
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember()

  //* Handlers
  async function onDelete() {
    const ok = await confirmRemove()

    if (!ok) return

    deleteMember(
      { id: memberId },
      {
        onSuccess() {
          toast.success('Member removed')
          onClose()
        },
        onError() {
          toast.error('Failed to remove member.')
        },
      },
    )
  }
  async function onLeave() {
    const ok = await confirmLeave()

    if (!ok) return
    deleteMember(
      { id: memberId },
      {
        onSuccess() {
          toast.success('You left the workspace')
          router.replace('/')
          onClose()
        },
        onError() {
          toast.error('Failed to leave the workspace.')
        },
      },
    )
  }
  async function onUpdateRole(role: 'admin' | 'member') {
    const ok = await confirmUpdate()

    if (!ok) return

    updateMember(
      { id: memberId, role },
      {
        onSuccess() {
          toast.success('Role changed')
          onClose()
        },
        onError() {
          toast.error('Failed to change role.')
        },
      },
    )
  }

  if (loadingMember || loadingCurrentMember) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-12 items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} variant="ghost" size="icon-sm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        <div className="flex h-full items-center justify-center">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-12 items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} variant="ghost" size="icon-sm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Profile not found</p>
        </div>
      </div>
    )
  }

  const isCurrentAdmin = currentMember?.role === 'admin'
  const isSelf = currentMember?._id === memberId

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex h-12 items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} variant="ghost" size="icon-sm">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="size-full max-h-[256px] max-w-[256px]">
            <AvatarImage src={member.user.image} />
            <AvatarFallback className="aspect-square text-6xl">
              {member.user.name?.charAt(0).toUpperCase() ?? 'M'}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col p-4">
          <p className="text-xl font-bold">{member.user.name}</p>
          {isCurrentAdmin && !isSelf ? (
            <div className="mt-4 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full capitalize">
                    {member.role} <ChevronDownIcon className="ml-2 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuRadioGroup
                    value={member.role}
                    onValueChange={(role) =>
                      onUpdateRole(role as 'admin' | 'member')
                    }
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="member">
                      Member
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={onDelete}
                variant="outline"
                className="w-full capitalize"
              >
                Remove
              </Button>
            </div>
          ) : isSelf && !isCurrentAdmin ? (
            <Button
              onClick={onLeave}
              variant="outline"
              className="mt-4 w-full capitalize"
            >
              Leave
            </Button>
          ) : null}
        </div>

        <Separator />

        <div className="flex flex-col p-4">
          <p className="mb-4 text-sm font-bold">Contact information</p>

          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-md bg-muted">
              <MailIcon className="size-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-semibold text-muted-foreground">
                Email Address
              </p>
              <Link
                href={`mailto:${member.user.email}`}
                className="text-sm text-[#1264a3] hover:underline"
              >
                {member.user.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Confirm Dialogs */}
      <UpdateDialog />
      <LeaveDialog />
      <RemoveDialog />
    </>
  )
}
