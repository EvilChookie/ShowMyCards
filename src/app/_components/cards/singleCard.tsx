import Image from 'next/image'
import * as Scry from 'scryfall-sdk'
import React, { useState } from 'react'
import Prose from '@/app/_components/layout/prose'
import Banner from '@/app/_components/layout/banner'
import { Dialog, DialogBody, DialogDescription, DialogTitle } from '@/app/_components/catalyst/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/_components/catalyst/table'

import UnknownCard from '@/images/UnknownCard.svg'

interface SingleCardProps {
  card: Scry.Card
}

type imageList = {
  image: string
  style: string
}

export default function SingleCard({ card }: SingleCardProps) {
  let [isOpen, setIsOpen] = useState(false)
  const imageURL = card?.card_faces[0]?.image_uris?.png ?? card?.image_uris?.png ?? UnknownCard
  return (
    <>
      <Image
        src={imageURL}
        className="m-0.5 cursor-pointer"
        width={227}
        height={326}
        alt={card?.name ?? 'Unknown Card'}
        onClick={() => setIsOpen(true)}
      />

      {card && (
        <Dialog open={isOpen} onClose={setIsOpen} size="4xl">
          <DialogTitle className="text-center">{card.name}</DialogTitle>
          <DialogDescription className="text-center capitalize">
            <Prose>
              {card.rarity}, {card.set_name} (<span className="uppercase">{card.set}</span>) &bull;{' '}
              <a href={card.scryfall_uri} target="_blank">
                Open in Scryfall
              </a>
            </Prose>
          </DialogDescription>
          <DialogBody>
            <CardFaces card={card} />
            <CardPrices card={card} />
          </DialogBody>
        </Dialog>
      )}
    </>
  )
}

function CardFaces({ card }: SingleCardProps) {
  let images: imageList[] = []

  const normalStyles = 'shadow-2xl'
  const horizontalStyles = `${normalStyles} rotate-90 mx-16`

  const twoFaces = ['transform', 'modal_dfc', 'flip']
  const horizontalCards = ['planar', 'split']

  if (twoFaces.includes(card.layout)) {
    card.card_faces.forEach((face) => {
      if (face.type_line?.includes('Battle')) {
        images.push({
          image: face.image_uris?.png.toString() ?? '',
          style: horizontalStyles,
        })
      } else {
        images.push({
          image: face.image_uris?.png.toString() ?? '',
          style: normalStyles,
        })
      }
    })
  } else if (horizontalCards.includes(card.layout)) {
    images.push({
      image: card.image_uris?.png ?? '',
      style: horizontalStyles,
    })
  } else {
    images.push({
      image: card.image_uris?.png ?? '',
      style: normalStyles,
    })
  }

  const faces = images.map((face) => (
    <div>
      <Image src={face.image} alt={card.name} className={face.style} width={295} height={423} />
    </div>
  ))

  return <div className="flex w-full flex-wrap justify-center">{faces}</div>
}

function CardPrices({ card }: SingleCardProps) {
  let descriptors: string[] = []
  let descriptorText = ''
  const FinishType = {
    foil: 'Foil',
    nonfoil: 'Normal',
    etched: 'Etched Foil',
    glossy: 'Glossy Foil',
  }

  const FinishToPrice = {
    nonfoil: parseFloat(card.prices.usd ?? '0'),
    foil: parseFloat(card.prices.usd_foil ?? '0'),
    etched: parseFloat(card.prices.usd_etched ?? '0'),
    glossy: parseFloat(card.prices.usd_foil ?? '0'),
  }

  enum EffectTypes {
    colorshifted = 'Color Shifted',
    inverted = 'Inverted Frame',
    showcase = 'Showcase',
    extendedart = 'Extended Art',
    etched = 'Etched',
  }

  if (card?.promo_types) {
    card.promo_types?.forEach((promoType) => {
      if (promoType.includes('foil')) {
        descriptors.push(promoType)
      }
    })
  }

  if (card?.frame_effects) {
    card.frame_effects.forEach((effect: keyof typeof Scry.FrameEffect) => {
      if ((EffectTypes as any)[effect]) {
        descriptors.push((EffectTypes as any)[effect])
      }
    })
  }

  if (descriptors.length > 0) {
    descriptorText = `(${descriptors.join(', ')})`
  }

  if (Object.values(card.prices).every((x) => x === null)) {
    return (
      <Banner type="warning" heading="No prices available">
        <p>This card has no prices available.</p>
      </Banner>
    )
  }

  return (
    <Prose>
      <Table>
        <TableHead>
          <TableRow>
            {card.finishes.map((finish) => (
              <TableHeader className="text-center text-lg">
                {FinishType[finish]} {descriptorText}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {card.finishes.map((finish) => (
              <TableCell className="text-center">${FinishToPrice[finish].toFixed(2)}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Prose>
  )
}
