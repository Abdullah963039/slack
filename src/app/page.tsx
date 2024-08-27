"use client";

import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Protected route
      <button onClick={() => signOut()}>sign out</button>
    </main>
  );
}
