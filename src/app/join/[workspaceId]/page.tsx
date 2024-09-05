'use client'

import { useEffect, useMemo, useState } from 'react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import Image from 'next/image'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info'
import { useJoinWorkspace } from '@/features/workspaces/api/use-join-workspace'

interface JoinWorkspaceProps {
  params: { workspaceId: string }
}

export default function JoinWorkspace({ params }: JoinWorkspaceProps) {
  const router = useRouter()
  // Note: Uses this way to auto cast {Id<"workspaces">} type to workspace
  const workspaceId = useWorkspaceId()

  const { data, isLoading } = useGetWorkspaceInfo(workspaceId)
  const { mutate, isPending } = useJoinWorkspace()

  const isMember = useMemo(() => data?.isMember, [data?.isMember])

  useEffect(() => {
    if (isMember) {
      router.push(`/workspaces/${workspaceId}`)
    }
  }, [isMember, router, workspaceId])

  const [joinCode, setJoinCode] = useState<string>('')

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )

  function onComplete(code: string) {
    mutate(
      { workspaceId, joinCode: code },
      {
        onSuccess(id) {
          toast.success('Workspace joined.')
          router.replace(`/workspaces/${id}`)
        },
        onError() {
          toast.error('Failed to join!')
        },
      },
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-8 rounded-lg bg-white p-8 shadow-md">
      <Image alt="logo" width={60} height={60} src={'/logo.svg'} />
      <div className="flex max-w-md flex-col items-center justify-center gap-y-4">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-muted-foreground">
            Enter the workspace code to join..
          </p>
        </div>

        <InputOTP
          maxLength={6}
          value={joinCode}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          onChange={(value) => setJoinCode(value.toUpperCase())}
          onComplete={onComplete}
          disabled={isPending}
        >
          <InputOTPGroup className="gap-x-2">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex gap-x-4">
        <Button
          size="lg"
          variant="outline"
          asChild
          disabled={isLoading || isPending}
        >
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
