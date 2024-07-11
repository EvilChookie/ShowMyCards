import type { AppRouter } from '@/server/api/root'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { createTRPCReact, inferReactQueryProcedureOptions } from '@trpc/react-query'

// infer the types for your router
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>

export const trpc = createTRPCReact<AppRouter>()
