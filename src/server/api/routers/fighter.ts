import { z } from "zod";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  publicProcedure,
  // adminProcedure, // TODO
} from "~/server/api/trpc";
import { fighters } from "~/server/db/schema";
import { eq, desc, and } from "drizzle-orm";

// TODO: Add input schemas for create/update if not already present

export const fighterRouter = createTRPCRouter({
  // Add a new list procedure
  list: publicProcedure.query(async ({ ctx }) => {
    try {
      const allFighters = await ctx.db.query.fighters.findMany({
        orderBy: [desc(fighters.createdAt)],
        // Add '.with(...)' here if you need related data in the list
      });
      return allFighters;
    } catch (error) {
      console.error("Failed to fetch fighters list:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch fighters",
      });
    }
  }),

  // Add this new procedure
  getFeatured: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(10).default(3),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 3;
      try {
        const featuredFighters = await ctx.db.query.fighters.findMany({
          where: eq(fighters.isFeatured, true),
          orderBy: [desc(fighters.createdAt)], // Or some other ordering like name
          limit: limit,
          // Add 'with' clause if you need related data like gym (if applicable)
        });
        return featuredFighters;
      } catch (error) {
        console.error("Failed to fetch featured fighters:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch featured fighters",
        });
      }
    }),

  // Add toggleFeatured mutation
  toggleFeatured: publicProcedure // TODO: Change to adminProcedure
    .input(
      z.object({
        id: z.string(),
        isFeatured: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(fighters)
          .set({ isFeatured: input.isFeatured, updatedAt: new Date() })
          .where(eq(fighters.id, input.id));
        return { success: true };
      } catch (error) {
        console.error("Failed to toggle fighter featured status:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update fighter",
        });
      }
    }),

  // TODO: Add create, update, delete procedures (marked for admin)
  // TODO: Add toggleFeatured procedure (marked for admin)
});
