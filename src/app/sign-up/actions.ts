"use server"

import { newUserSchema } from "@/types/models/user";
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(prevState: { message: string, isErr: boolean }, formData: FormData) {
  const supabase = createClient()

  const rawFormData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("password-confirm")
  }

  const parse = newUserSchema.safeParse(rawFormData)

  if (!parse.success) {
    return { message: "The form was not parsed successfully", isErr: true }
  }

  parse.data.passwordConfirm = ""

  const { error } = await supabase.auth.signUp({
    email: parse.data.email, password: parse.data.password, options: {
      data: {
        username: parse.data.username
      }
    }
  })

  if (error) {
    return { message: error.message, isErr: true }
  }

  revalidatePath('/', 'layout')
  // redirect('/')
  return { message: "Registered successfully", isErr: false }
}

