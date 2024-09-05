import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = { id: Id<'workspaces'> }
type TResponse = Id<'workspaces'> | null

export const useRemoveWorkspace = () => {
  return useCustomMutation<TRequest, TResponse>(api.workspaces.remove)
}
