'use client'

import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'

import { Id } from '@root/convex/_generated/dataModel'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

const userItemVariants = cva(
  'flex h-7 items-center justify-start gap-1.5 overflow-hidden px-4 text-sm font-normal',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'text-[#481359] bg-white/90 hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface UserItemProps extends VariantProps<typeof userItemVariants> {
  id: Id<'members'>
  label?: string
  image?: string
}

export const UserItem = ({
  id,
  image,
  label = 'Member',
  variant,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId()

  return (
    <Button
      size="sm"
      asChild
      variant="transparent"
      className={cn(userItemVariants({ variant }))}
    >
      <Link href={`/workspaces/${workspaceId}/members/${id}`}>
        <Avatar className="mr-1 size-5">
          <AvatarImage src={image} />
          <AvatarFallback>{label.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  )
}
