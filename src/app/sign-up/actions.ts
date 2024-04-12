"use server"

import { newUserSchema } from "@/types/models/user";
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = createClient()

  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("password-confirm"),
  }

  const parse = newUserSchema.safeParse(rawFormData)

  if (!parse.success) {
    throw parse.error;
  }

  parse.data.passwordConfirm = ""

  const { error } = await supabase.auth.signUp(parse.data)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}