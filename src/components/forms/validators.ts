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
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8).optional(),
  firstName: z.string(),
  lastName: z.string(),
})