import { z } from 'zod'
export type SignUp = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

export type SignIn = Omit<SignUp, 'confirmPassword' | 'firstName' | 'lastName'>

export const signupSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8).optional(),
  firstName: z.string(),
  lastName: z.string(),
})

export const loginSchema = z.object({
  username: z.string().min(1, {message: 'Username is required'}),
  password: z.string().min(1),
})