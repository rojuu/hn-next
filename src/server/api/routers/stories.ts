import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

export const storiesRouter = createTRPCRouter({
  top: publicProcedure
    // .input(z.object({ text: z.string() }))
    .query(async (/* { input } */) => {
      const response = await fetch(`${env.HN_API_URL}/topstories.json`);
      const topStories = (await response.json()) as number[];
      return topStories;
    }),
});
