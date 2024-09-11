import dynamic from 'next/dynamic'
import { toast } from 'sonner'
import Quill from 'quill'
import { useRef, useState } from 'react'

import { useCreateMessage } from '@/features/messages/api/use-create-message'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useChannelId } from '@/hooks/use-channel-id'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

interface ChatInputProps {
  placeholder: string
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0)
  const [isPending, setIsPending] = useState(false)

  const { mutate: sendMessage } = useCreateMessage()
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const editorRef = useRef<Quill | null>(null)

  async function handleSubmit({
    body,
    image,
  }: {
    body: string
    image: File | null
  }) {
    try {
      setIsPending(true)
      await sendMessage(
        {
          body,
          workspaceId,
          channelId,
        },
        { throwError: true },
      )

      setEditorKey((prev) => prev + 1)
    } catch (error) {
      toast.error('Failed to send')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="w-full px-5">
      <Editor
        key={editorKey}
        onSubmit={handleSubmit}
        placeholder={placeholder}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  )
}
