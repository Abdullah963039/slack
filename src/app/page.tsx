"use client";

import { UserButton } from "@/components/user-button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <main className="">
      Protected route
      <UserButton />
    </main>
  );
}
