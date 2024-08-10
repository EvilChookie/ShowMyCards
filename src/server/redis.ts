import Redis from 'ioredis'
import type { Card } from 'scryfall-sdk'

const redis = new Redis(process.env.CACHE_URL ?? 'redis://localhost:6379')

export async function cacheCard(card: Card) {
  await redis.set(card.id, JSON.stringify(card))
}

export async function isCached(id: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    redis.get(id, (err, result) => {
      if (err) {
        resolve(false)
      }

      resolve(result !== null)
    })
  })
}

export async function getCachedCard(id: string) {
  return await redis.get(id, (err, result) => {
    if (err) {
      return false
    }

    if (result) {
      return JSON.parse(result)
    }

    return false
  })
}
