'use server'

import {InsertTicket, tickets} from '@/db/schema'
import {AddTicketSchema} from '../zodSchema/schemas'
import {db} from '@/db/connect'
import {getPageSession} from '@/auth/lucia'
import * as z from 'zod'
import {revalidatePath} from 'next/cache'

type FormData = z.infer<typeof AddTicketSchema>

export async function addTicketAction(data: FormData, projectId: string) {
  try {
    const {title, description} = data
    const status = 'Working on it'

    const newTicket = {
      projectId: projectId,
      title: title,
      description: description,
      status: status,
    } as InsertTicket

    await db.insert(tickets).values(newTicket)
    revalidatePath('/')
  } catch (error) {
    return null
  }
}
