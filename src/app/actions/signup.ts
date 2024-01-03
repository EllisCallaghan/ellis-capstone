'use server'

import * as context from 'next/headers'
import {LoginSchema} from '../zodSchema/schemas'
import {auth} from '@/auth/lucia'
import {SqliteError} from 'better-sqlite3'
import * as z from 'zod'

type FormData = z.infer<typeof LoginSchema>

export async function signupAction(data: FormData) {
  const {username, password} = data

  try {
    const user = await auth.createUser({
      key: {
        providerId: 'username',
        providerUserId: username.toLowerCase(),
        password, // hashed
      },
      attributes: {
        username,
      },
    })
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest('POST', context)
    authRequest.setSession(session)
    return 302
  } catch (e) {
    if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return 400
    }
    return 500
  }
}
