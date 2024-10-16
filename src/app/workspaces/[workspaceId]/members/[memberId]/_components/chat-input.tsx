import dynamic from 'next/dynamic'
import { toast } from 'sonner'
import Quill from 'quill'
import { useRef, useState } from 'react'

import { Id } from '@root/convex/_generated/dataModel'

import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useCreateMessage } from '@/features/messages/api/use-create-message'
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

interface ChatInputProps {
  placeholder: string
  conversationId: Id<'conversations'>
}

type CreateMessageValues = {
  workspaceId: Id<'workspaces'>
  conversationId: Id<'conversations'>
  body: string
  image?: Id<'_storage'>
}

export const ChatInput = ({ placeholder, conversationId }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0)
  const [isPending, setIsPending] = useState(false)

  const { mutate: sendMessage } = useCreateMessage()
  const { mutate: generateUploadUrl } = useGenerateUploadUrl()

  const workspaceId = useWorkspaceId()
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

      editorRef.current?.enable(false)

      const values: CreateMessageValues = {
        conversationId,
        workspaceId,
        body,
        image: undefined,
      }

      if (image) {
        const url = await generateUploadUrl({}, { throwError: true })

        if (!url) throw new Error('Failed to upload image')

        const result = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': image.type },
          body: image,
        })

        if (!result.ok) throw new Error('Failed to upload')

        const { storageId } = await result.json()

        values.image = storageId
      }

      await sendMessage(values, { throwError: true })

      setEditorKey((prev) => prev + 1)
    } catch (error) {
      toast.error('Failed to send')
    } finally {
      setIsPending(false)
      editorRef.current?.enable(true)
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
