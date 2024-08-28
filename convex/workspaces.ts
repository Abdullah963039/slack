import { query } from "./_generated/server";

export const get = query({
    args: {},
    async handler(ctx) {
        await ctx.db.query("workspaces").collect()
    },
})