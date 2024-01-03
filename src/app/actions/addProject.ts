'use server'

import {InsertProject, projects} from '@/db/schema'
import {AddProjectSchema} from '../zodSchema/schemas'
import {db} from '@/db/connect'
import {getPageSession} from '@/auth/lucia'
import * as z from 'zod'
import {revalidatePath} from 'next/cache'

type FormData = z.infer<typeof AddProjectSchema>

export async function addProjectAction(data: FormData) {
  try {
    const session = await getPageSession()
    const {title, description} = data

    if (!session) {
      return null
    }

    const newProject = {
      userId: session.user.userId as string,
      title: title,
      description: description,
    } as InsertProject

    await db.insert(projects).values(newProject)
    revalidatePath('/')
  } catch (error) {
    return null
  }
}
