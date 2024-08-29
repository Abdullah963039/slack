"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { UserButton } from "@/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/create-workspace-modal";

export default function Home() {
  const router = useRouter();
  const { isOpen, onOpen } = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspaces/${workspaceId}`);
    } else if (!isOpen) {
      onOpen();
    }
  }, [workspaceId, isLoading, isOpen]);

  return (
    <main className="">
      <UserButton />
    </main>
  );
}
