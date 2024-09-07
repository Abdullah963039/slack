import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

import { UpdateChannelValues } from '../components/forms/validation'

type TRequest = UpdateChannelValues & { id: Id<'channels'> }
type TResponse = Id<'channels'>

export const useUpdateChannel = () => {
  return useCustomMutation<TRequest, TResponse>(api.channels.update)
}
