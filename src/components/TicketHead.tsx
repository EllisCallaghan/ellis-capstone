import {Heading, Text} from '@radix-ui/themes'
import React from 'react'
import TicketDialog from './TicketDialog'

type Props = {
  projectId: string
}

export default function TicketHead({projectId}: Props) {
  return (
    <div className="flex flex-wrap items-center mb-3">
      <div>
        <Heading size="5">Tickets</Heading>
        <Text color="gray">Your tickets are listed below</Text>
      </div>
      <div className="ml-auto flex items-center py-2 px-3">
        <TicketDialog projectId={projectId} />
      </div>
    </div>
  )
}
