'use client'

import {deleteProjectAction} from '@/app/actions/deleteProject'
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
  async function deleteProject() {
    const result = await deleteProjectAction(Number(id))
    if (result === null) {
      toast.error('Failed to delete project')
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
        <AlertDialogTitle>Delete Project</AlertDialogTitle>
        <AlertDialogDescription size="2">
          Are you sure you want to delete this project?
        </AlertDialogDescription>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialogCancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={deleteProject} variant="solid" color="red">
              Delete Project
            </Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}
