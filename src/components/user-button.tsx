'use client'

import { Loader2, LogOut } from 'lucide-react'
import { useAuthActions } from '@convex-dev/auth/react'

import { AvatarFallback, Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/features/auth/api/use-current-user'

export const UserButton = () => {
  const { signOut } = useAuthActions()
  const { data, isLoading } = useCurrentUser()

  if (isLoading)
    return (
      <div className="flex size-10 items-center justify-center overflow-hidden">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )

  if (!data) return null

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 rounded-md transition hover:opacity-75">
          <AvatarImage src={data.image} alt={data.name} />
          <AvatarFallback className="rounded-md bg-violet-600 font-semibold text-white">
            {data.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem
          onClick={() => void signOut()}
          className="cursor-pointer"
        >
          <LogOut className="mr-1.5 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
