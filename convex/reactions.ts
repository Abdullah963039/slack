import { v } from 'convex/values'
import { getAuthUserId } from '@convex-dev/auth/server'

import { Id } from './_generated/dataModel'
import { mutation, QueryCtx } from './_generated/server'

//! Helpers
async function getMember(
  ctx: QueryCtx,
  workspaceId: Id<'workspaces'>,
  userId: Id<'users'>,
) {
  return ctx.db
    .query('members')
    .withIndex('by_workspace_id_user_id', (q) =>
      q.eq('workspaceId', workspaceId).eq('userId', userId),
    )
    .unique()
}

//! API

export const toggle = mutation({
  args: {
    messageId: v.id('messages'),
    value: v.string(),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx)

    if (!userId) throw new Error('Unauthorized')

    const message = await ctx.db.get(args.messageId)

    if (!message) throw new Error('Message not found.')

    const member = await getMember(ctx, message.workspaceId, userId)

    if (!member) throw new Error('Unauthorized')

    const existingMessageReactionFromUser = await ctx.db
      .query('reactions')
      .filter((q) =>
        q.and(
          q.eq(q.field('messageId'), message._id),
          q.eq(q.field('memberId'), member._id),
          q.eq(q.field('value'), args.value),
        ),
      )
      .first()

    if (!!existingMessageReactionFromUser) {
      await ctx.db.delete(existingMessageReactionFromUser._id)

      return existingMessageReactionFromUser._id
    } else {
      const reactionId = await ctx.db.insert('reactions', {
        value: args.value,
        messageId: message._id,
        memberId: member._id,
        workspaceId: message.workspaceId,
      })

      return reactionId
    }
  },
})
