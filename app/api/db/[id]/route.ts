import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { auth, clerkClient } from "@clerk/nextjs/server";

const DB_NAME = process.env.DB_NAME || "test";
const DB_COLLECTION = process.env.DB_COLLECTION || "test_conf_data";

export async function PUT(
  request: NextRequest,
  { params }:any 
) {
  try {
    const { userId } = await auth(); // Get authenticated user's ID
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await params; // await or else get error

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updatedData = await request.json();
    // removing _id field to avoid overriding it and it won't work
    const { _id, lastUpdate, ...safedata } = updatedData;

    const result = await db.collection(DB_COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: safedata,
        $currentDate: { lastUpdate: true }
       }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Record updated successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(
    request: NextRequest,
    { params }:any
  ) {
    try {
      // Authenticate the user
    const { userId } = await auth(); // Get authenticated user's ID
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
                const client = await clientPromise;
                const db = client.db(DB_NAME);
                
                const { id } = await params; // no need for "await" here

                // getting role of user
                const clerk_client = await clerkClient()
        
                const user = await clerk_client.users.getUser(userId)
        
                const role = user?.privateMetadata?.role || "user"; // Default to 'user'

        
                if (!id) {
                    return NextResponse.json({ error: "ID is required" }, { status: 400 });
                }

                // Define delete condition
                const deleteQuery: { _id: ObjectId; userId?: string } = { _id: new ObjectId(id) };

                // If not a power user, restrict deletion to their own records
                if (role !== "power_user") {
                    deleteQuery.userId = user.id;
                }
        
                const result = await db.collection(DB_COLLECTION).deleteOne(deleteQuery);
        
                if (result.deletedCount === 0) {
                    return NextResponse.json({ error: "Record not found" }, { status: 404 });
                }
        
                return NextResponse.json({ message: "Record deleted successfully" });
            } catch (e) {
                console.error(e);
                return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
            }
  }

