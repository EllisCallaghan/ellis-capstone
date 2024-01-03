'use client'

import {deleteTicketAction} from '@/app/actions/deleteTicket'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
  IconButton,
} from '@radix-ui/themes'
import {Trash2} from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

type Props = {
  id: string
}

export default function DeleteTicketDialog({id}: Props) {
  async function deleteTicket() {
    const result = await deleteTicketAction(Number(id))
    if (result === null) {
      toast.error('Failed to delete ticket')
      return
    }
  }
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <IconButton aria-label="Delete Ticket" color="red">
          <Trash2 size={16} />
        </IconButton>
      </AlertDialogTrigger>
      <AlertDialogContent style={{maxWidth: 450}}>
        <AlertDialogTitle>Delete Ticket</AlertDialogTitle>
        <AlertDialogDescription size="2">Are you sure you want to delete this ticket?</AlertDialogDescription>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialogCancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={deleteTicket} variant="solid" color="red">
              Delete Ticket
            </Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}
