'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import Image from 'next/image'

import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces'
import { useCreateWorkspaceModal } from '@/features/workspaces/store/create-workspace-modal'

export default function Home() {
  const router = useRouter()
  const { isOpen, onOpen } = useCreateWorkspaceModal()
  const { data, isLoading } = useGetWorkspaces()

  const workspaceId = useMemo(() => data?.[0]?._id, [data])

  useEffect(() => {
    if (isLoading) return

    if (workspaceId !== undefined) {
      router.replace(`/workspaces/${workspaceId}`)
    } else if (!isOpen) {
      onOpen()
    }
  }, [workspaceId, isLoading, isOpen])

  return (
    <div className="flex size-full animate-pulse flex-col items-center justify-center">
      <div className="mb-8 flex items-center justify-center gap-x-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <p className="text-3xl font-bold text-[#5e2c5f]">Slack</p>
      </div>

      <Loader className="size-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Please wait ...</p>
    </div>
  )
}
