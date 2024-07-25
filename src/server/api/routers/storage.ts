import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { createableStorageObject, editableStorageObject } from '@/server/schema/storage'

const storageRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.storage.findMany({ orderBy: [{ type: 'asc' }, { name: 'asc' }] })
  }),

  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.storage.findFirst({ where: { id: input } })
  }),

  create: publicProcedure.input(createableStorageObject).mutation((opts) => {
    return opts.ctx.db.storage.create({ data: { name: opts.input.name, type: opts.input.type } })
  }),

  update: publicProcedure.input(editableStorageObject).mutation((opts) => {
    return opts.ctx.db.storage.update({
      where: { id: opts.input.id },
      data: { name: opts.input.name, type: opts.input.type },
    })
  }),

  delete: publicProcedure.input(z.number()).mutation((opts) => {
    return opts.ctx.db.storage.delete({ where: { id: opts.input } })
  }),
})

export default storageRouter
