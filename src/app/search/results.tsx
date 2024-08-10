import React, { Suspense } from 'react'

import { RouterOutputs, trpc } from '@/utils/trpc'
import SingleCard from '@/app/_components/cards/singleCard'
import Loading from './loading'
import Prose from '../_components/layout/prose'
import Banner from '../_components/layout/banner'

type SearchResultType = RouterOutputs['search']['doSearch']

interface SearchResultProps {
  results: SearchResultType
}

export default function SearchResults({ results }: SearchResultProps) {
  function RenderInventory({ cards }: { cards: typeof results.inventory }) {
    const ids = cards.map((card) => card.scryfallId)
    const inventory = ids.map((id) => trpc.search.getCard.useQuery(id).data)
    return inventory.map((card) => <SingleCard key={card?.id} card={card!} />)
  }

  function RenderScryfall({ cards }: { cards: typeof results.scryfall }) {
    return cards.map((card) => <SingleCard key={card!.id} card={card!} />)
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        {results?.inventory.length > 0 && (
          <>
            <Prose>
              <hr className="my-4" />
              <h2 className="mb-4">In your Inventory: {results.inventory.length} matches</h2>
            </Prose>
            <div className="-m-0.5 flex flex-wrap">
              <RenderInventory cards={results.inventory} />
            </div>
          </>
        )}

        {results?.scryfall.length > 0 && (
          <>
            <Prose>
              <hr className="my-4" />
              <h2 className="mb-4">From Scryfall: {results.scryfall.length} matches</h2>
            </Prose>
            <div className="-m-0.5 flex flex-wrap">
              <RenderScryfall cards={results.scryfall} />
            </div>
          </>
        )}

        {!results?.inventory && !results?.scryfall && (
          <Banner type="warning" heading="Your search returned no results!">
            Your search did not match any items in your inventory, or results from Scryfall. Sorry about that!
          </Banner>
        )}
      </Suspense>
    </>
  )
}
