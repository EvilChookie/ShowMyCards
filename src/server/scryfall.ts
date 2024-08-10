import { cacheCard, getCachedCard } from './redis'
import * as Scry from 'scryfall-sdk'

export async function scryfallSearch(query: string | null) {
  return await Scry.Cards.search(`${query} game:paper`)
    .on('data', (card) => {
      cacheCard(card)
    })
    .waitForAll()
}

export async function getCard(id: string): Promise<Scry.Card> {
  const cachedCard = await getCachedCard(id)

  if (cachedCard) {
    return JSON.parse(cachedCard)
  } else {
    const card = await Scry.Cards.byId(id)
    cacheCard(card)
    return card
  }
}
