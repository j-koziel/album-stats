"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { loginFormSchema } from "@/types/models/user"

export async function login(formData: FormData) {
  const supabase = createClient()

  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  const validatedFormData = loginFormSchema.safeParse(rawFormData)

  if (!validatedFormData.success) {
    throw new Error("These details are invalid")
  }

  const { error } = await supabase.auth.signInWithPassword(validatedFormData.data)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")

}