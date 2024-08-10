'use client'

import Prose from '@/app/_components/layout/prose'

import { useState } from 'react'
import { trpc } from '@/utils/trpc'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Input, InputGroup } from '@/app/_components/catalyst/input'
import SearchResults from './results'
import Loading from './loading'
import Banner from '../_components/layout/banner'

export default function Page() {
  const [query, setQuery] = useState('')
  const results = trpc.search.doSearch.useQuery(query, { enabled: Boolean(query) })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      search: { value: string }
    }
    setQuery(target.search.value)
  }

  return (
    <>
      <Prose>
        <h1>Search</h1>
        <p>
          You can search for cards here. This search is done via ScryFall, and all{' '}
          <a href="https://scryfall.com/docs/syntax">Scryfall syntax</a> is supported.
        </p>
      </Prose>

      <form className="my-4" onSubmit={(e) => handleSubmit(e)}>
        <InputGroup>
          <MagnifyingGlassIcon />
          <Input name="search" placeholder="Search&hellip;" aria-label="Search" />
        </InputGroup>
      </form>

      {query && (
        <Prose>
          <p>
            You searched for <code>{query}</code>.
          </p>
        </Prose>
      )}

      {query && results.status == 'pending' && <Loading />}
      {results.status == 'success' && <SearchResults results={results.data} />}
      {results.status == 'error' && (
        <Banner type="error" heading="There was a problem performing your search.">
          The error reported was: {results.error.message}
        </Banner>
      )}
    </>
  )
}
