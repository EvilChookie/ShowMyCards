'use client'

import Prose from '@/app/_components/layout/prose'
import Lozenge from '@/app/_components/layout/lozenge'
import Loading from './loading'

import { useForm } from 'react-hook-form'
import { Suspense, useState } from 'react'
import { RouterInputs, trpc } from '@/utils/trpc'

import { zodResolver } from '@hookform/resolvers/zod'
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/20/solid'

import { Input } from '@/app/_components/catalyst/input'
import { Button } from '@/app/_components/catalyst/button'
import { Select } from '@/app/_components/catalyst/select'
import { ErrorMessage, Field, Label } from '@/app/_components/catalyst/fieldset'
import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/app/_components/catalyst/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/_components/catalyst/table'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/app/_components/catalyst/dialog'
import { createableStorageObject, editableStorageObject } from '@/server/schema/storage'
import Banner from '../_components/layout/banner'

type UpdateStorageType = RouterInputs['storage']['update']
type DeleteStorageType = RouterInputs['storage']['delete']

export default function Page() {
  return (
    <>
      <Prose>
        <h1>Manage Storage Locations</h1>
        <p>
          Cards are stored in a storage location - which can be a binder or a box. Rules are used to send cards to
          storage locations.
        </p>
      </Prose>
      <CreateControl />
      <LocationTable />
    </>
  )
}

function LocationTable() {
  const [locations, query] = trpc.storage.list.useSuspenseQuery()
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Storage Name</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense fallback={<Loading />}>
            {...locations.map((location: UpdateStorageType) => (
              <TableRow key={location.id}>
                <TableCell className="font-medium">{location.name}</TableCell>
                <TableCell className="w-1">
                  <Lozenge color={location.type == 'binder' ? 'sky' : 'yellow'} text={location.type} />
                </TableCell>
                <TableCell className="w-1 space-x-2">
                  <EditControl location={location} />
                  <DeleteControl location={location.id} />
                </TableCell>
              </TableRow>
            ))}
            {locations.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Banner type="warning" heading="There are no storage locations">
                    You need to create a Storage Location first!
                  </Banner>
                </TableCell>
              </TableRow>
            )}
          </Suspense>
        </TableBody>
      </Table>
    </>
  )
}

function CreateControl() {
  const createLocation = trpc.storage.create.useMutation()
  let [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createableStorageObject) })

  return (
    <>
      <div className="my-4 text-center sm:text-right">
        <Button color="green" onClick={() => setIsOpen(true)} className="w-full sm:w-auto">
          <PlusCircleIcon /> Create new Storage Location
        </Button>
      </div>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <form
          onSubmit={handleSubmit((d) => {
            createLocation.mutate(d)
            setIsOpen(false)
          })}>
          <DialogTitle>Create a new Storage Location</DialogTitle>
          <DialogDescription>A Storage Location can either be a binder or a box.</DialogDescription>
          <DialogBody>
            <Field>
              <Label>Storage Name</Label>
              <Input {...register('name')} />
              {errors.name?.message && <ErrorMessage>{errors.name?.message.toString()}</ErrorMessage>}
            </Field>
            <Field>
              <Label>Storage Type</Label>
              <Select {...register('type')}>
                <option value="">Select one...</option>
                <option value="binder">A Binder</option>
                <option value="box">A Box</option>
              </Select>
              {errors.type?.message && <ErrorMessage>{errors.type?.message.toString()}</ErrorMessage>}
            </Field>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="green" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

function EditControl({ location }: { location: UpdateStorageType }) {
  const updateLocation = trpc.storage.update.useMutation()
  let [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: location,
    resolver: zodResolver(editableStorageObject),
  })
  return (
    <>
      <Button color="dark" onClick={() => setIsOpen(true)}>
        <PencilIcon />
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <form
          onSubmit={handleSubmit((d) => {
            updateLocation.mutate(d)
            setIsOpen(false)
          })}>
          <DialogTitle>Update {location.name}</DialogTitle>
          <DialogDescription>
            {location.name} is a '{location.type}' location.
          </DialogDescription>
          <DialogBody>
            <Field>
              <Label>Storage Name</Label>
              <Input {...register('name')} />
              {errors.name?.message && <ErrorMessage>{errors.name?.message.toString()}</ErrorMessage>}
            </Field>
            <Field>
              <Label>Storage Type</Label>
              <Select {...register('type')}>
                <option value="">Select one...</option>
                <option value="binder">A Binder</option>
                <option value="box">A Box</option>
              </Select>
              {errors.type?.message && <ErrorMessage>{errors.type?.message.toString()}</ErrorMessage>}
            </Field>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="green" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

function DeleteControl({ location }: { location: DeleteStorageType }) {
  const deleteLocation = trpc.storage.delete.useMutation()
  let [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button color="red" onClick={() => setIsOpen(true)}>
        <TrashIcon />
      </Button>
      <Alert open={isOpen} onClose={setIsOpen}>
        <form
          onSubmit={() => {
            deleteLocation.mutate(location)
            setIsOpen(false)
          }}>
          <AlertTitle>Are you sure?</AlertTitle>
          <AlertDescription>
            If you delete this location, all of the cards associated with it will be orphaned, and will need to be
            re-sorted.
          </AlertDescription>
          <AlertActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" color="red">
              Delete
            </Button>
          </AlertActions>
        </form>
      </Alert>
    </>
  )
}
