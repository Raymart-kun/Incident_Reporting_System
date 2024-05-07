import { z } from "zod";
export type SignUp = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export type SignIn = Omit<SignUp, "confirmPassword" | "firstName" | "lastName">;

export const signupSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8).optional(),
  firstName: z.string(),
  lastName: z.string(),
  province: z.string(),
  city: z.string(),
  brgy: z.string()
});

export const CreateReportSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(200),
  datetime: z.date(),
  full_address: z.string(),
  province: z.string(),
  city: z.string(),
  barangay: z.string(),
});

export type CreateReportSchemaType = z.infer<typeof CreateReportSchema>;


export const loginSchema = z.object({
  username: z.string().min(1, {message: 'Username is required'}),
  password: z.string().min(1),
})
