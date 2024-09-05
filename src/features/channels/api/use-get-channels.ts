import { useQuery } from 'convex/react'

import { Id } from '@root/convex/_generated/dataModel'
import { api } from '@root/convex/_generated/api'

interface UseGetChannelsProps {
  workspaceId: Id<'workspaces'>
}

export function useGetChannels({ workspaceId }: UseGetChannelsProps) {
  const data = useQuery(api.channels.get, { workspaceId })

  return { data, isLoading: data === undefined }
}
