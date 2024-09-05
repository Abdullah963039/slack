import { z } from 'zod'

export type CreateChannelValues = z.infer<typeof createChannelSchema>
export const createChannelSchema = z.object({
  name: z
    .string({ message: 'Channel name is required.' })
    .min(3, { message: 'Name too short.' })
    .max(80, { message: 'Name too long.' }),
})
