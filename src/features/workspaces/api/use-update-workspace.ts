import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

import { UpdateWorkspaceValues } from '../components/validation'

type TRequest = UpdateWorkspaceValues & { id: Id<'workspaces'> }
type TResponse = Id<'workspaces'> | null

export const useUpdateWorkspace = () => {
  return useCustomMutation<TRequest, TResponse>(api.workspaces.update)
}
