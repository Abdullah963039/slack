import { v } from 'convex/values'
import { getAuthUserId } from '@convex-dev/auth/server'

import { query, QueryCtx } from './_generated/server'
import { Doc, Id } from './_generated/dataModel'

function populateUser(
  ctx: QueryCtx,
  userId: Id<'users'>,
): Promise<Doc<'users'> | null> {
  return ctx.db.get(userId)
}

export const get = query({
  args: { workspaceId: v.id('workspaces') },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx)

    if (!userId) return []

    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_user_id', (q) =>
        q.eq('workspaceId', args.workspaceId).eq('userId', userId),
      )
      .unique()

    if (!member) return []

    const data = await ctx.db
      .query('members')
      .withIndex('by_workspace_id', (q) =>
        q.eq('workspaceId', args.workspaceId),
      )
      .collect()

    const members = []

    for (const member of data) {
      const user = await populateUser(ctx, member.userId)

      if (user) {
        members.push({ ...member, user })
      }
    }

    return members
  },
})

export const current = query({
  args: { workspaceId: v.id('workspaces') },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx)

    if (!userId) return null

    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_user_id', (q) =>
        q.eq('workspaceId', args.workspaceId).eq('userId', userId),
      )
      .unique()

    return !!member ? member : null
  },
})
