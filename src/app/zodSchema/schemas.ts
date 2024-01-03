import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, {message: 'Password must be at least 6 characters.'}),
})

export const AddProjectSchema = z.object({
  title: z.string().min(1, {message: 'Please enter a title'}),
  description: z.string().min(1, {message: 'Please enter a description'}),
})

export const AddTicketSchema = z.object({
  title: z.string().min(1, {message: 'Please enter a title'}),
  description: z.string().min(1, {message: 'Please enter a description'}),
})
