import { useQuery } from 'convex/react'

import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

interface UseGetMessageProps {
  id: Id<'messages'>
}

export const useGetMessage = ({ id }: UseGetMessageProps) => {
  const data = useQuery(api.messages.getById, { id })

  return { data, isLoading: data === undefined }
}
