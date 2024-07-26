import React from 'react'
import Throbber from '../_components/layout/throbber'
import { TableBody, TableCell, TableRow } from '../_components/catalyst/table'

export default function Loading() {
  return (
    <>
      <TableRow>
        <TableCell colSpan={3}>
          <Throbber />
        </TableCell>
      </TableRow>
    </>
  )
}
