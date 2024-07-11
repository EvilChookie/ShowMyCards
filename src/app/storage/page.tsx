'use client'
import { Prose } from '../_components/layout/prose'

export default async function Page() {
  return (
    <>
      <Prose>
        <h1>Manage Storage Locations</h1>
        <p>
          Cards are stored in a storage location - which can be a binder or a box. Rules are used to send cards to
          storage locations.
        </p>
      </Prose>
    </>
  )
}
