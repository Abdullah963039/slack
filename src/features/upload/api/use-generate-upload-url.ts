import { api } from '@root/convex/_generated/api'

import { useCustomMutation } from '@/hooks/use-custom-mutation'

type TRequest = {}
type TResponse = string

export const useGenerateUploadUrl = () => {
  return useCustomMutation<TRequest, TResponse>(api.upload.generateUploadUrl)
}
