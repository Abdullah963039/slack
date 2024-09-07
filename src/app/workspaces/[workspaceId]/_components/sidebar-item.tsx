'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { IconType } from 'react-icons/lib'
import { cva, type VariantProps } from 'class-variance-authority'

import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { cn } from '@/lib/utils'

const sidebarItemVariants = cva(
  'flex h-7 items-center justify-start gap-1.5 overflow-hidden px-[18px] text-sm font-normal',
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

interface SidebarItemProps {
  label: string
  id: string
  icon: LucideIcon | IconType
  variant?: VariantProps<typeof sidebarItemVariants>['variant']
}

export const SidebarItem = ({
  icon: Icon,
  id,
  label,
  variant,
}: SidebarItemProps) => {
  const workspaceId = useWorkspaceId()

  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVariants({ variant }))}
      asChild
    >
      <Link href={`/workspaces/${workspaceId}/channels/${id}`}>
        <Icon className="mr-1 size-3.5 shrink-0" />
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  )
}
