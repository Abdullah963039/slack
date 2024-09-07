import { z } from 'zod'

export type CreateChannelValues = z.infer<typeof createChannelSchema>
export const createChannelSchema = z.object({
  name: z
    .string({ message: 'Channel name is required.' })
    .min(3, { message: 'Name too short.' })
    .max(80, { message: 'Name too long.' }),
})

export type UpdateChannelValues = z.infer<typeof updateChannelSchema>
// Could be extended
export const updateChannelSchema = createChannelSchema
