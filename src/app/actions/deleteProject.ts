'use server'

import {db} from '@/db/connect'
import {projects} from '@/db/schema'
import {eq} from 'drizzle-orm'
import {revalidatePath} from 'next/cache'

export async function deleteProjectAction(id: number) {
  try {
    await db.delete(projects).where(eq(projects.id, id))
    revalidatePath('/')
  } catch (error) {
    return null
  }
}
