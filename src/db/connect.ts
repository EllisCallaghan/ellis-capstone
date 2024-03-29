//import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
//import sqlite from "better-sqlite3";

import {drizzle} from 'drizzle-orm/libsql'
import {createClient} from '@libsql/client'
import 'dotenv/config'

const client = createClient({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_AUTH_TOKEN as string,
})

export const db = drizzle(client)

//export const sqliteDatabase = sqlite('sqlite.db')

//export const db: BetterSQLite3Database = drizzle(sqliteDatabase)
