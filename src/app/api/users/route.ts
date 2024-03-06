import clientPromise from "@/lib/mongodb";
import { User } from "@/types/models/users"
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    const usersDb = client.db("album-stats")
    const users = await usersDb
      .collection("users")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    console.log(usersDb)
    console.log(users)

    return Response.json(users)
  } catch (err) {
    console.error(err)
  }
}

export async function POST(request: Request) {
  try {
    const rawBody: User = await request.json()

    const client = await clientPromise;

    const usersDb = client.db("album-stats")

    await usersDb.collection("users").insertOne(rawBody)

    return Response.json({ "message": "The user has been created successfully", "user": rawBody })
  } catch (err) {
    console.error(err)
  }
}