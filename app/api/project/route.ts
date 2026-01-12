import {NextRequest, NextResponse} from "next/server";
import {currentUser} from "@clerk/nextjs/server";
import {projectsTable, screenConfigTable, usersTable} from "@/config/schema";
import {db} from "@/config/db";
import {and, eq} from "drizzle-orm";

export async function POST(req: NextRequest) {
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }

    const {userInput, device, projectId} = await req.json()

    if (!userInput) {
        return NextResponse.json({message: 'user promt is required'}, {status: 401})
    }

    const clerkUser = await db.query.usersTable.findFirst({
        where: (u, {eq}) => eq(u.clerkUserId, user.id),
    });

    if (!clerkUser) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }

    const result = await db.insert(projectsTable).values({
        userId: clerkUser?.id,
        device: device,
        userInput: userInput,
        projectId
    }).returning()

    return NextResponse.json(result[0])
}

export async function GET(req: NextRequest) {

    try {
        const projectId = await req.nextUrl.searchParams.get("projectId")

        if (!projectId) {
            return NextResponse.json({ error: "projectId is required" }, { status: 400 })
        }

        const user = await currentUser()

        if (!user) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401})
        }

        const rows = await db
            .select({
                project: projectsTable,
            })
            .from(projectsTable)
            .innerJoin(usersTable, eq(projectsTable.userId, usersTable.id))
            .where(
                and(
                    eq(projectsTable.projectId, projectId), // или projectsTable.projectId — смотри как реально называется колонка
                    eq(usersTable.clerkUserId, user.id),
                )
            )
            .limit(1);

        const result = rows[0]?.project ?? null;
        const screenConfig = await db.select().from(screenConfigTable)
            .where(eq(screenConfigTable.projectId, projectId))

        return NextResponse.json(
            {projectDetails: result,
            screenConfig: screenConfig,},
            { status: result ? 200 : 404 })

    } catch (err) {
        console.error("GET /api/project error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

export async function PUT(req: NextRequest) {
    const {projectName, theme, projectId } = await req.json()

    const result = await db.update(projectsTable).set({
        projectName: projectName,
        theme: theme,
        projectId: projectId
    }).where(eq(projectsTable.projectId, projectId)).returning()
    const safeResult = JSON.parse(JSON.stringify(result[0]));


    return NextResponse.json(safeResult)
}