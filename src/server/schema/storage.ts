import { z } from 'zod'

type createableStorage = {
  name: string
  type: string
}

type editableStorage = {
  id: number
  name: string
  type: string
}

const createableStorageObject = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1),
  type: z
    .string({
      required_error: 'Storage Type is required',
      invalid_type_error: 'Storage Type must be a string',
    })
    .min(1),
})

const editableStorageObject = z.object({
  id: z.number(),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1),
  type: z
    .string({
      required_error: 'Storage Type is required',
      invalid_type_error: 'Storage Type must be a string',
    })
    .min(1),
})

export type { createableStorage, editableStorage }
export { createableStorageObject, editableStorageObject }
