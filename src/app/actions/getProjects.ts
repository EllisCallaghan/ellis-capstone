'use server'

import {db} from '@/db/connect'
import {projects} from '@/db/schema'
import {eq} from 'drizzle-orm'

export async function getProjectsAction(userId: string) {
  try {
    const projectData = await db.select().from(projects).where(eq(projects.userId, userId))
    return projectData
  } catch (error) {
    return null
  }
}
