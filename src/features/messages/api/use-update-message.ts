import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = {
  id: Id<'messages'>
  body: string
}
type TResponse = Id<'messages'>

export const useUpdateMessage = () => {
  return useCustomMutation<TRequest, TResponse>(api.messages.update)
}
