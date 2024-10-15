import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = {
  messageId: Id<'messages'>
  value: string
}
type TResponse = Id<'reactions'>

export const useToggleReaction = () => {
  return useCustomMutation<TRequest, TResponse>(api.reactions.toggle)
}
