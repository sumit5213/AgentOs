import z from "zod";

export const CreateWorkSpaceSchema = z.object({
    path: z.string()
})

export type CeateWorkSpaceSchemaType = z.infer<typeof CreateWorkSpaceSchema>;

export const CreateSessionSchema = z.object({
    workspaceId : z.string()  
})

export type CreateSessionSchemaType = z.infer<typeof CreateSessionSchema>;

export const AddMessageSchema = z.object({
    sessionId: z.string(),
    message: z.string()
})

export type AddMessageSchemaType = z.infer<typeof CreateSessionSchema>

export type IncommingMessageType = {
    type:"create-workspace", 
    payload: CeateWorkSpaceSchemaType
} | {
    type:"create-session", 
    payload: CreateSessionSchemaType
} | {
    type:"add-message", 
    payload: AddMessageSchemaType
}


