import { z } from "zod"

export interface User {
  name: string;
  email: string;
  password: string;
}

export const newUserSchema = z.object({ username: z.string().max(50), email: z.string().email().max(50), password: z.string().min(8).max(50), passwordConfirm: z.string().min(8).max(50) }).refine((data) => data.password === data.passwordConfirm, { message: "Passwords do not match", path: ["confirmPassword"] })

export const loginFormSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8).max(50)
})