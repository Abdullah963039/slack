import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { name: v.string() },

  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);

    if (!userId) throw new Error("Unauthorized");

    // TODO: Create ...
    const joinCode = "123453";

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    return workspaceId;
  },
});

export const get = query({
  args: {},
  async handler(ctx) {
    return await ctx.db.query("workspaces").collect();
  },
});
