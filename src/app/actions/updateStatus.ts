'use server'

import {db} from '@/db/connect'
import {projects, tickets} from '@/db/schema'
import {eq} from 'drizzle-orm'

export async function updateStatusAction(status: string, id: number) {
  try {
    await db.update(tickets).set({status: status}).where(eq(tickets.id, id))
  } catch (error) {
    return null
  }
}
