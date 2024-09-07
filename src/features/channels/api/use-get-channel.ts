import { useQuery } from 'convex/react'

import { Id } from '@root/convex/_generated/dataModel'
import { api } from '@root/convex/_generated/api'

interface UseGetChannelProps {
  channelId: Id<'channels'>
}

export function useGetChannel({ channelId }: UseGetChannelProps) {
  const data = useQuery(api.channels.getById, { id: channelId })

  return { data, isLoading: data === undefined }
}
