import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { getCard, scryfallSearch } from '@/server/scryfall'

const searchRouter = createTRPCRouter({
  doSearch: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    let scryfallResults
    let inventoryResults

    if (input.length > 0) {
      // Search Scryfall:
      scryfallResults = await scryfallSearch(input)

      // List of card names from those results to highlight in our inventory:
      const cardNames = scryfallResults?.map((card) => card.name ?? card.card_faces[0]?.name)

      // And find those cards:
      inventoryResults = await ctx.db.inventoryEntry.findMany({
        where: {
          name: {
            in: cardNames,
          },
        },
        include: {
          storage: true,
        },
      })
    }

    // Finally, return the unified list:
    return {
      scryfall: scryfallResults ?? [],
      inventory: inventoryResults ?? [],
    }
  }),
  getCard: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await getCard(input)
  }),
})

export default searchRouter
