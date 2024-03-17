"use server";

import { newUserSchema } from "@/types/models/user";
import clientPromise from "./mongodb";

export async function createNewUser(prevState: { message: string }, formData: FormData) {
  const client = await clientPromise

  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("password-confirm"),
  }
  const parse = newUserSchema.safeParse(rawFormData)

  if (!parse.success) {
    throw new Error("Form parsing was not successful");
  }

  const usersDb = client.db("album-stats")

  // Check if the user already exists
  const possibleDuplicateUser = await usersDb
    .collection("users")
    .find({ email: parse.data.email })
    .sort({ metacritic: -1 })
    .toArray();

  if (possibleDuplicateUser.length > 0) {
    return { message: "This user already exists" }
  }

  // Once all validation is complete insert the new user into the db
  try {
    await usersDb.collection("users").insertOne(rawFormData)
    return { message: "User created successfully" }
  } catch (err) {
    return { message: "Failed to create a new user" }
  }

}