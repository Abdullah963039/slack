import { useQuery } from 'convex/react'

import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

interface UseGetMembersProps {
  workspaceId: Id<'workspaces'>
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const data = useQuery(api.members.get, { workspaceId })

  return { data, isLoading: data === undefined }
}
