import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = {
  id: Id<'messages'>
}
type TResponse = Id<'messages'>

export const useDeleteMessage = () => {
  return useCustomMutation<TRequest, TResponse>(api.messages.remove)
}
