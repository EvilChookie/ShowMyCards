import { z } from 'zod'

const StorageSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  type: z.literal('binder').or(z.literal('box')),
})

export {
    StorageSchema
}