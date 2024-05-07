import { loginSchema, signupSchema } from "@/components/forms/validators";
import { z } from "zod";

export type SignUp = {
  username: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  provCode: string;
  citymunCode: string;
  brgyCode: string;
};

export type SignIn = Omit<SignUp, "confirmPassword" | "firstName" | "lastName">;
export type SignUpSchema = z.infer<typeof signupSchema>;
export type SignInSchema = z.infer<typeof loginSchema>;

export type ProvinceType = {
  id: number;
  psgcCode: string;
  provDesc: string;
  regCode: string;
  provCode: string;
};

export type CityType = {
  id: number;
  psgcCode: string;
  citymunDesc: string;
  provCode: string;
  citymunCode: string;
};

export type BarangyType = {
  id: number;
  brgyCode: string;
  brgyDesc: string;
  regCode: string;
  provCode: string;
  citymunCode: string;
};
