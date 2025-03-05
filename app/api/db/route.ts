import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import {auth, clerkClient } from '@clerk/nextjs/server'

const DB_NAME = process.env.DB_NAME || "test";
const DB_COLLECTION = process.env.DB_COLLECTION || "test_conf_data";
// GET: Fetch all records
export async function GET() {
    try {
        const { userId } = await auth()

        // Protect the route by checking if the user is signed in
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // getting role of user
        const clerk_client = await clerkClient()

        const user = await clerk_client.users.getUser(userId)

        const role = user?.privateMetadata?.role || "user"; // Default to 'user'


        const query = role === "power_user" ? {} : { userId };

        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const details = await db.collection(DB_COLLECTION).find(query).toArray();
        return NextResponse.json(details);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Add new record
export async function POST(req:Request) {
    try {
        const { userId } = await auth()

        // Protect the route by checking if the user is signed in
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const data = await req.json();

        // Add timestamps
        const timestamp = new Date();
        const newRecord = {
        ...data,
        createdAt: timestamp, // Add createdAt timestamp
        lastUpdate: timestamp, // Add updatedAt timestamp
        userId: userId
        };

        const result = await db.collection(DB_COLLECTION).insertOne(newRecord);
        return NextResponse.json({ message: "Record added successfully", result });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
