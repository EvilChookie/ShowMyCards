import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const storageRouter = createTRPCRouter({
    list: publicProcedure.query(({ ctx }) => {
        return ctx.db.storage.findMany({ orderBy: [{ type: 'asc' }, { name: 'asc' }] })
    }),

    getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
        return ctx.db.storage.findFirst({ where: { id: input } })
    }),

    create: publicProcedure.input(z.object({ name: z.string(), type: z.string() })).mutation(async (opts) => {
        return await opts.ctx.db.storage.create({ data: { name: opts.input.name, type: opts.input.type } })
    }),

    deleteStorage: publicProcedure.input(z.number()).query(({ ctx, input }) => {
        return ctx.db.storage.delete({ where: { id: input } })
    })
});

export default storageRouter;