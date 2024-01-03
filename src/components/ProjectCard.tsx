'use client'

import React from 'react'
import Link from 'next/link'
import {Card, Text, Heading} from '@radix-ui/themes'
import {FileText} from 'lucide-react'
import toast from 'react-hot-toast'
import {deleteProjectAction} from '@/app/actions/deleteProject'
import DeleteProjectDialog from './DeleteProjectDialog'

type Props = {
  id: string
  title: string
  description: string
}

export default function ProjectCard({id, title, description}: Props) {
  async function deleteProject() {
    const result = await deleteProjectAction(Number(id))
    if (result === null) {
      toast.error('Failed to delete project')
      return
    }
  }

  return (
    <Card id={id} className="mb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="inline-flex w-10 h-10 mr-3 justify-center items-center">
            <Link href={`/projects/${encodeURIComponent(id)}`} className="no-underline">
              <FileText />
            </Link>
          </span>
          <div>
            <Link className="underline" href={`/projects/${encodeURIComponent(id)}`}>
              <Heading size="3">{title}</Heading>
            </Link>
            <Link className="no-underline" href={`/projects/${encodeURIComponent(id)}`}>
              <Text color="gray">{description}</Text>
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <DeleteProjectDialog id={id} />
        </div>
      </div>
    </Card>
  )
}
