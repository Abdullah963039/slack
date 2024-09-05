import { useParams } from 'next/navigation'

import { Id } from '@root/convex/_generated/dataModel'

export const useChannelId = () => {
  const params = useParams() as { channelId: string }

  return params.channelId as Id<'channels'>
}
