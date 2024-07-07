'use client'

import Banner from '@/app/_components/layout/banner'
import { Prose } from '@/app/_components/layout/prose'

import { Button } from '@/app/_components/catalyst/button'
import { Dialog, DialogBody, DialogDescription, DialogTitle } from '@/app/_components/catalyst/dialog'
import { Field, FieldGroup, Fieldset, Label } from '@/app/_components/catalyst/fieldset'
import { Input } from '@/app/_components/catalyst/input'
import { Select } from '@/app/_components/catalyst/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/_components/catalyst/table'

import { trpc } from '@/utils/trpc'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { z } from 'zod'
import Lozenge from '../_components/layout/lozenge'

export default function Page() {
  let [isOpen, setIsOpen] = useState(false)

  const utils = trpc.useUtils()
  const storageLocations = trpc.storage.list.useQuery()
  const mutation = trpc.storage.create.useMutation({
    onSettled() {
      // After we have completed, invalidate the existing data:
      utils.storage.list.invalidate()
    },
  })

  async function createLocation(formData: FormData) {
    // A model to validate against:
    const newStorage = z.object({ name: z.string(), type: z.string() })

    // // Perform the Mutation:
    mutation.mutateAsync(
      newStorage.parse({
        name: formData.get('name'),
        type: formData.get('type'),
      }),
    )

    // And close the dialog:
    setIsOpen(false)
  }

  return (
    <>
      <Prose>
        <Button type="button" color="green" className="float-right" onClick={() => setIsOpen(true)}>
          <PlusCircleIcon /> Create New
        </Button>
        <h1>Storage Locations</h1>
        <p>
          A storage location is somewhere that cards are stored. It can be a storage box or a binder. Cards are routed
          to storage locations by rules.
        </p>
      </Prose>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Create a new Storage Location</DialogTitle>
        <DialogDescription>The new storage location can be a storage box or binder.</DialogDescription>
        <DialogBody>
          <form action={createLocation}>
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Storage Name</Label>
                  <Input name="name" placeholder="A descriptive name..." required />
                </Field>
                <Field>
                  <Label>Storage Type</Label>
                  <Select name="type" required>
                    <option value="binder">A binder</option>
                    <option value="box">A box</option>
                  </Select>
                </Field>
                <Field>
                  <Button type="submit" className="w-full" color="green" disabled={mutation.isPending}>
                    Create this Storage Location
                  </Button>
                </Field>
              </FieldGroup>
            </Fieldset>
          </form>
        </DialogBody>
      </Dialog>

      {mutation.error && (
        <Banner type="error" heading="There was a problem creating the storage">
          <p>{mutation.error.message}</p>
        </Banner>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {storageLocations.data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                <Banner type="info" heading="There are no storage locations">
                  <p>You'll need to create one first</p>
                </Banner>
              </TableCell>
            </TableRow>
          )}

          {storageLocations.data?.map((storageLocation) => (
            <TableRow key={storageLocation.id}>
              <TableCell>{storageLocation.name}</TableCell>
              <TableCell>
                <Lozenge color={storageLocation.type == 'binder' ? 'purple' : 'sky'} text={storageLocation.type} />
              </TableCell>
              <TableCell>Action buttons go here.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
