import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = {
  id: Id<'members'>
}
type TResponse = Id<'members'>

export const useDeleteMember = () => {
  return useCustomMutation<TRequest, TResponse>(api.members.remove)
}
