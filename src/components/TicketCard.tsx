'use client'

import React from 'react'
import {Card, Text, Heading} from '@radix-ui/themes'
import {FolderKanban} from 'lucide-react'
import DeleteTicketDialog from './DeleteTicketDialog'
import StatusDropDown from './StatusDropDown'

type Props = {
  id: string
  title: string
  description: string
  status: string
}

export default function TicketCard({id, title, description, status}: Props) {
  return (
    <Card id={id} className="mb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="inline-flex w-10 h-10 mr-3 justify-center items-center">
            <FolderKanban />
          </span>
          <div>
            <Heading size="3">{title}</Heading>
            <Text color="gray">{description}</Text>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-4">
            <StatusDropDown id={id} status={status} />
          </div>
          <DeleteTicketDialog id={id} />
        </div>
      </div>
    </Card>
  )
}
