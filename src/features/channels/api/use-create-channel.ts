import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

import { CreateChannelValues } from '../components/forms/validation'

type TRequest = CreateChannelValues & { workspaceId: Id<'workspaces'> }
type TResponse = Id<'channels'>

export const useCreateChannel = () => {
  return useCustomMutation<TRequest, TResponse>(api.channels.create)
}
