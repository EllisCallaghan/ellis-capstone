'use server'

import * as context from 'next/headers'
import {LoginSchema} from '../zodSchema/schemas'
import {auth} from '@/auth/lucia'
import {LuciaError} from 'lucia'
import {redirect} from 'next/navigation'
import * as z from 'zod'

type FormData = z.infer<typeof LoginSchema>

export async function loginAction(data: FormData) {
  const {username, password} = data

  try {
    const key = await auth.useKey('username', username.toLowerCase(), password)
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest('POST', context)
    authRequest.setSession(session)
    return 307
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
    ) {
      return 400
    }
    return 500
  }
}

export async function logoutAction() {
  const authRequest = auth.handleRequest('POST', context)
  const session = await authRequest.validate()
  if (!session) {
    return 401
  }

  await auth.invalidateSession(session.sessionId)
  authRequest.setSession(null)
  redirect('/login')
}

export async function redirectHome() {
  redirect('/')
}
