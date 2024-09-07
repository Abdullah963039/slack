import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = { id: Id<'channels'> }
type TResponse = Id<'channels'>

export const useDeleteChannel = () => {
  return useCustomMutation<TRequest, TResponse>(api.channels.remove)
}
