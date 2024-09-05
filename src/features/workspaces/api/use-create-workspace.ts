import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

import { CreateWorkspaceValues } from '../components/validation'

type TRequest = CreateWorkspaceValues
type TResponse = Id<'workspaces'> | null

export const useCreateWorkspace = () => {
  return useCustomMutation<TRequest, TResponse>(api.workspaces.create)
}
