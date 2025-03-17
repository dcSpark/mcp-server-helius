export type ToolResultSchema = {
    content: ToolResultContent[],
    isError?: boolean
}

type ToolResultContent = {
    type: "text",
    text: string,
} | {
    type: "image",
    data: string, // base64 encoded image data
    mimeType: string,
} | {
    type: "resource",
    resource: {
        url: string,
        mimeType: string,
        text: string,
    }
}