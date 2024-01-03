'use client'

import React from 'react'
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import {useForm} from 'react-hook-form'
import {FilePlus2} from 'lucide-react'
import {zodResolver} from '@hookform/resolvers/zod'
import {AddTicketSchema} from '@/app/zodSchema/schemas'
import toast from 'react-hot-toast'
import {addTicketAction} from '@/app/actions/addTicket'
import * as z from 'zod'

type FormData = z.infer<typeof AddTicketSchema>

type Props = {
  projectId: string
}

export default function TicketDialog({projectId}: Props) {
  const [open, setOpen] = React.useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(AddTicketSchema),
  })

  async function onSubmit(data: FormData) {
    const result = await addTicketAction(data, projectId)
    if (result === null) {
      toast.error('Failed to add a new ticket')
      return
    }
    setOpen(false)
    reset()
  }

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="solid">
          <FilePlus2 width="16" height="16" /> Add Ticket
        </Button>
      </DialogTrigger>

      <DialogContent style={{maxWidth: 450}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Ticket</DialogTitle>
          <DialogDescription size="2" mb="4">
            Enter the details below to create a new ticket
          </DialogDescription>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Ticket Title
              </Text>
              <TextFieldInput
                {...register('title', {required: true})}
                id="title"
                name="title"
                mb="1"
                placeholder="Enter your project title"
                autoComplete="off"
              />
              {errors?.title && <p className="text-red-400 text-sm">{errors?.title?.message}</p>}
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Ticket Description
              </Text>
              <TextFieldInput
                {...register('description', {required: true})}
                id="description"
                name="description"
                mb="1"
                placeholder="Enter your project description"
                autoComplete="off"
              />
              {errors?.description && <p className="text-red-400 text-sm">{errors?.description?.message}</p>}
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <DialogClose>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </Flex>
        </form>
      </DialogContent>
    </DialogRoot>
  )
}
