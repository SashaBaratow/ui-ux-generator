import {NextRequest, NextResponse} from "next/server";
import {currentUser} from "@clerk/nextjs/server";
import {projectsTable, usersTable} from "@/config/schema";
import {db} from "@/config/db";

export async function POST(req: NextRequest) {
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({message:"Unauthorized"}, {status: 401})
    }

    const {userInput, device} = await req.json()

    if (!userInput) {
        return NextResponse.json({message: 'user promt is required'}, {status: 401})
    }

    const clerkUser = await db.query.usersTable.findFirst({
        where: (u, { eq }) => eq(u.clerkUserId, user.id),
    });

    if (!clerkUser) {
        return NextResponse.json({message:"Unauthorized"}, {status: 401})
    }

    const result = await db.insert(projectsTable).values({
        userId: clerkUser?.id,
        device: device,
        userInput: userInput,
    }).returning()

    return NextResponse.json(result[0])
}