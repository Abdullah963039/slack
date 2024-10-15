import { useParentMessageId } from '@/features/messages/store/use-parent-message-id'

export const usePanel = () => {
  const [parentMessageId, setParentMessageId] = useParentMessageId()

  function onOpenMessage(messageId: string) {
    setParentMessageId(messageId)
  }

  function onClose() {
    setParentMessageId(null)
  }

  return {
    parentMessageId,
    onOpenMessage,
    onClose,
  }
}
