import { z } from 'zod'

export type CreateWorkspaceValues = z.infer<typeof createWorkspaceSchema>
export const createWorkspaceSchema = z.object({
  name: z
    .string({ message: 'Workspace name is required' })
    .min(3, 'Workspace name is too short.'),
})

export type UpdateWorkspaceValues = z.infer<typeof updateWorkspaceSchema>
export const updateWorkspaceSchema = createWorkspaceSchema
