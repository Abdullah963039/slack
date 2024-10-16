import { useParams } from 'next/navigation'

import { Id } from '@root/convex/_generated/dataModel'

export const useMemberId = () => {
  const params = useParams() as { memberId: string }

  return params.memberId as Id<'members'>
}
