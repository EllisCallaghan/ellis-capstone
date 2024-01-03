import {sqliteTable, text, blob, integer} from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
})

export const session = sqliteTable('user_session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  activeExpires: blob('active_expires', {
    mode: 'bigint',
  }).notNull(),
  idleExpires: blob('idle_expires', {
    mode: 'bigint',
  }).notNull(),
})

export const key = sqliteTable('user_key', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  hashedPassword: text('hashed_password'),
})

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
})

export const tickets = sqliteTable('tickets', {
  id: integer('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  status: text('status').default('Working on it'),
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id, {onDelete: 'cascade'}),
})

export type InsertProject = typeof projects.$inferInsert
export type InsertTicket = typeof tickets.$inferInsert
