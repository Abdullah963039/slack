import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = { workspaceId: Id<'workspaces'>; joinCode: string }
type TResponse = Id<'workspaces'> | null

export const useJoinWorkspace = () => {
  return useCustomMutation<TRequest, TResponse>(api.workspaces.join)
}
