import {lucia} from 'lucia'
import {nextjs_future} from 'lucia/middleware'
//import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
//import {db} from '../db/connect'

import {libsql} from '@lucia-auth/adapter-sqlite'

import {cache} from 'react'
import * as context from 'next/headers'
import {createClient} from '@libsql/client'
import 'dotenv/config'

const db = createClient({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_AUTH_TOKEN as string,
})

// const db = createClient({
//   url: process.env.DATABASE_URL!,
// })

// Set up Drizzle, sqlite adapter
export const auth = lucia({
  // adapter: betterSqlite3(sqliteDatabase, {
  //   user: "user",
  //   session: "user_session",
  //   key: "user_key",
  // }),
  adapter: libsql(db, {
    user: 'user',
    session: 'user_session',
    key: 'user_key',
  }),
  env: 'DEV',
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
    }
  },
})

export type Auth = typeof auth

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest('GET', context)
  return authRequest.validate()
})
