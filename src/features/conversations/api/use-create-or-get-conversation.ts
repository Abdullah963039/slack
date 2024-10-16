import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = {
  workspaceId: Id<'workspaces'>
  memberId: Id<'members'>
}
type TResponse = Id<'conversations'>

export const useCreateOrGetConversation = () => {
  return useCustomMutation<TRequest, TResponse>(api.conversations.createOrGet)
}
