import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = {
  workspaceId: Id<'workspaces'>
  body: string
  image?: Id<'_storage'>
  channelId?: Id<'channels'>
  parentMessageId?: Id<'messages'>
}
type TResponse = Id<'messages'>

export const useCreateMessage = () => {
  return useCustomMutation<TRequest, TResponse>(api.messages.create)
}
