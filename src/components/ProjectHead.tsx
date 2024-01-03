import {Heading, Text} from '@radix-ui/themes'
import React from 'react'
import ProjectDialog from './ProjectDialog'

export default function ProjectHead() {
  return (
    <div className="flex flex-wrap items-center mb-3">
      <div>
        <Heading size="5">Projects</Heading>
        <Text color="gray">Your projects are listed below</Text>
      </div>
      <div className="ml-auto flex items-center py-2 px-3">
        <ProjectDialog />
      </div>
    </div>
  )
}
