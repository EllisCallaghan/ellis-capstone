'use server'

import {db} from '@/db/connect'
import {tickets} from '@/db/schema'
import {eq} from 'drizzle-orm'

export async function getTicketsAction(projectId: string) {
  try {
    const ticketsData = await db.select().from(tickets).where(eq(tickets.projectId, projectId))
    return ticketsData
  } catch (error) {
    return null
  }
}
