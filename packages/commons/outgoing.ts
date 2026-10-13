import z from "zod";

export const WorkSpaceCreatedSchema = z.object({
    id: z.string()
})

export type WorkSpaceCreatedSchemaType = z.infer<typeof WorkSpaceCreatedSchema>;


export const SessionCreated = z.object({
    id: z.string()

})

export type SessionCreatedType = z.infer<typeof SessionCreated>;

export const MessageAdded = z.object({
    id: z.string()

})

export type MessageAddedType = z.infer<typeof MessageAdded>;



export type OutgoingMessageType = {
    type:"workspace-created", 
    payload: WorkSpaceCreatedSchemaType
} | {
    type:"session-created", 
    payload: SessionCreatedType
} | {
    type:"message-added", 
    payload: MessageAddedType
}