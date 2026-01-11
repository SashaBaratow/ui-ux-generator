import {NextRequest, NextResponse} from "next/server";
import {openrouter} from "@/config/openrouter";
import {APP_LAYOUT_CONFIG_PROMPT} from "@/data/promt";
import {projectsTable, screenConfigTable} from "@/config/schema";
import {db} from "@/config/db";
import {eq} from "drizzle-orm";

export async function POST(req: NextRequest) {
    const {userInput, deviceType, projectId} = await req.json()

    const aiResult = await openrouter.chat.send({
        model: "openai/gpt-oss-120b:free",
        messages: [
            {
                role: 'system',
                content: [
                    {
                        type: 'text',
                        text: APP_LAYOUT_CONFIG_PROMPT.replace('{deviceType}', deviceType),
                    }
                ]
            },
            {
                role: "user",
                content: [
                    {
                        type: 'text',
                        text: userInput
                    }
                ]
            }
        ],
        stream: false,
    });

    const JSONAiResult = JSON.parse(aiResult?.choices[0]?.message?.content as string);

    if (JSONAiResult) {
        await db.update(projectsTable).set({
            projectVisualDescription: JSONAiResult?.projectVisualDescription,
            projectName: JSONAiResult?.projectName,
            theme: JSONAiResult?.theme,
        }).where(eq(projectsTable.projectId, projectId as string))

        JSONAiResult?.screens?.forEach(async (screen) => {
            const result = await db.insert(screenConfigTable).values({
                projectId: projectId,
                purpose: screen.purpose,
                screenDescription: screen.layoutDescription,
                screenId: screen.id,
                screenName: screen.name,
            })
        })
        return NextResponse.json(JSONAiResult)
    }
    else {
        NextResponse.json({message: 'Server Error'})
    }

}