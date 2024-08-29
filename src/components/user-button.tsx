"use client";

import { Loader2, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  if (isLoading)
    return (
      <Loader2 className="inline size-8 animate-spin text-muted-foreground" />
    );

  if (!data) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage src={data.image} alt={data.name} />
          <AvatarFallback className="bg-violet-600 font-semibold text-white">
            {data.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-1.5 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
