export type ProjectType = {
    id: number,
    projectId: number,
    device: string,
    userInput: string,
    createdAt: string,
    projectName?: string,
    theme?: string,
}

export type ScreenConfigType = {
    id: number,
    screenId: number,
    screenName?: string,
    purpose: string,
    screenDescription?: string,
    code?: string
}
