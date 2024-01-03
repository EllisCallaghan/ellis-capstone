'use server'

import {db} from '@/db/connect'
import {tickets} from '@/db/schema'
import {eq} from 'drizzle-orm'
import {revalidatePath} from 'next/cache'

export async function deleteTicketAction(id: number) {
  try {
    await db.delete(tickets).where(eq(tickets.id, id))
    revalidatePath('/')
  } catch (error) {
    return null
  }
}
