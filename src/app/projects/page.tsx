import {redirect} from 'next/navigation'
import {getPageSession} from '@/auth/lucia'
import React from 'react'
import {Card} from '@radix-ui/themes'
import ProjectCard from '@/components/ProjectCard'
import ProjectHead from '@/components/ProjectHead'
import NavBar from '@/components/NavBar'
import {getProjectsAction} from '../actions/getProjects'

export default async function HomePage() {
  const session = await getPageSession()
  if (!session) {
    return redirect('/login')
  }

  const projects = await getProjectsAction(session.user.userId)
  return (
    <>
      <NavBar name={session.user.username} />
      <section className="pb-8 pt-2">
        <div className="container px-4 mx-auto">
          <Card>
            <ProjectHead />
            {projects?.map((data: any) => {
              return (
                <ProjectCard key={data.id} id={data.id} title={data.title} description={data.description} />
              )
            })}
          </Card>
        </div>
      </section>
    </>
  )
}
