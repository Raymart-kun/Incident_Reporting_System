import { loginSchema, signupSchema } from "@/components/forms/validators"
import { z } from "zod"

export type SignUp = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

export type SignIn = Omit<SignUp, 'confirmPassword' | 'firstName' | 'lastName'>
export type SignUpSchema = z.infer<typeof signupSchema>
export type SignInSchema = z.infer<typeof loginSchema>