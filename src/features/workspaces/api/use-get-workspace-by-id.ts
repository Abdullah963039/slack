import { useQuery } from 'convex/react'

import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

export const useGetWorkspaceById = (id: Id<'workspaces'>) => {
  const data = useQuery(api.workspaces.getById, { id })

  return { data, isLoading: data === undefined }
}
