import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = {
  id: Id<'members'>
  role: 'admin' | 'member'
}
type TResponse = Id<'members'>

export const useUpdateMember = () => {
  return useCustomMutation<TRequest, TResponse>(api.members.update)
}
