import {NextApiRequest} from "next";
import {NextRequest, NextResponse} from "next/server";
import {openrouter} from "@/config/openrouter";
import {APP_LAYOUT_CONFIG_PROMPT, GENERATION_SCREEN_PROMPT} from "@/data/promt";
import {screenConfigTable} from "@/config/schema";
import {db} from "@/config/db";
import {and, eq} from "drizzle-orm";

export async function POST(req: NextRequest) {
    const {
        projectId,
        screenId,
        screenName,
        purpose,
        screenDescription,
    } = await req.json()

    try {
        const userInput = `
        screen name is: '${screenName},
        screen Purpose is: '${purpose}',
        screen Description is: '${screenDescription}',
    `

        const aiResult = await openrouter.chat.send({
            model: "openai/gpt-oss-120b:free",
            messages: [
                {
                    role: 'system',
                    content: [
                        {
                            type: 'text',
                            text: GENERATION_SCREEN_PROMPT,
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

        const code = aiResult?.choices[0]?.message?.content

        const updateResult = await db.update(screenConfigTable)
            .set({
                code: code as string,
            }).where(and(eq(screenConfigTable.projectId, projectId),
                eq(screenConfigTable?.id, screenId)))
            .returning()

        return NextResponse.json(updateResult)
    }
    catch(err) {
        return NextResponse.json({message: 'Error in rout generate screen' + err}, {status: 401})
    }
}