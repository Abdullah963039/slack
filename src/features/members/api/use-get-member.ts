import { useQuery } from 'convex/react'

import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

interface UseGetMemberProps {
  id: Id<'members'>
}

export const useGetMember = ({ id }: UseGetMemberProps) => {
  const data = useQuery(api.members.getById, { id })

  return { data, isLoading: data === undefined }
}
