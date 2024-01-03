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
import {AddProjectSchema} from '@/app/zodSchema/schemas'
import {addProjectAction} from '@/app/actions/addProject'
import toast from 'react-hot-toast'
import * as z from 'zod'

type FormData = z.infer<typeof AddProjectSchema>

export default function ProjectDialog() {
  const [open, setOpen] = React.useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(AddProjectSchema),
  })

  async function onSubmit(data: FormData) {
    const result = await addProjectAction(data)
    if (result === null) {
      toast.error('Failed to add a new project')
      return
    }
    setOpen(false)
    reset()
  }

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="solid">
          <FilePlus2 width="16" height="16" /> Add Project
        </Button>
      </DialogTrigger>

      <DialogContent style={{maxWidth: 450}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription size="2" mb="4">
            Enter the details below to create a new project
          </DialogDescription>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Project Title
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
                Project Description
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
