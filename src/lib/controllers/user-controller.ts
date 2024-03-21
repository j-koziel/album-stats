"use server";

import { newUserSchema, User } from "@/types/models/user";
import clientPromise from "../mongodb/mongodb";
import bcrypt from "bcrypt"

export async function createNewUser(prevState: { message: string }, formData: FormData) {
  const client = await clientPromise

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

  // Hash the password
  const hashedPassword: string = await bcrypt.hash(parse.data.password, 8)

  const preparedUserData: User = { name: parse.data.name, email: parse.data.email, password: hashedPassword }

  // Once all validation/hashing is complete insert the new user into the db
  try {
    await usersDb.collection<User>("users").insertOne(preparedUserData)
    return { message: "User created successfully" }
  } catch (err) {
    return { message: "Failed to create a new user" }
  }
}