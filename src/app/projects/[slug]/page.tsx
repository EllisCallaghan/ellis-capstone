import {getTicketsAction} from '@/app/actions/getTickets'
import {getPageSession} from '@/auth/lucia'
import NavBar from '@/components/NavBar'
import TicketCard from '@/components/TicketCard'
import TicketHead from '@/components/TicketHead'
import {Card, Link} from '@radix-ui/themes'
import {redirect} from 'next/navigation'
import React from 'react'

export default async function page({params}: {params: {slug: string}}) {
  const session = await getPageSession()
  if (!session) {
    return redirect('/login')
  }

  const projectId = params.slug
  const tickets = await getTicketsAction(projectId)

  return (
    <>
      <NavBar name={session.user.username} />
      <section className="pb-8 pt-2">
        <div className="container px-4 mx-auto">
          <Link href="/projects">Back to projects</Link>
          <Card className="mt-4">
            <TicketHead projectId={projectId} />
            {tickets?.map((data: any) => {
              return (
                <TicketCard
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  description={data.description}
                  status={data.status}
                />
              )
            })}
          </Card>
        </div>
      </section>
    </>
  )
}
