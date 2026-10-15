import { AddMessageSchema, CreateSessionSchema, CreateWorkSpaceSchema, type IncommingMessageType, type OutgoingMessageType,  } from "commons/types";
import { SessionModel, WorkspaceModel } from "db/client";
import mongoose from "mongoose";
import {WebSocket} from "ws";

export class User{
    private socket: WebSocket;
    public id: string;

    constructor(id: string, socket:WebSocket){
        this.socket = socket;
        this.id = id;
    }

    async sendMessage(payload: OutgoingMessageType){
        this.socket.send(JSON.stringify(payload));
    }

    async handleIncommingMessage(msg: IncommingMessageType): Promise<OutgoingMessageType>{
        if(msg.type==="create-workspace"){
            const {success, data} = CreateWorkSpaceSchema.safeParse(msg);
            if(!success){
                throw new Error("incorrect schema");
            }
            const workspace = await WorkspaceModel.create({
                path: data.path,        // Users/Sumit/workspace/Codexclone
                name: data.path.split("/").pop()        // Codexclone
            })
            
            return {
                type:"workspace-created",
                payload:{
                    id: workspace._id.toString()
                }
            } 
        }

        if(msg.type==="create-session"){
            const {success, data} = CreateSessionSchema.safeParse(msg);
            if(!success){
                throw new Error("incorrect schema");
            }
            const session = await SessionModel.create({
                workspace: new mongoose.Types.ObjectId(data.workspaceId),
                conversation: []
            })
            
            return {
                type:"session-created",
                payload:{
                    id: session._id.toString()
                }
            } 
        }

        if(msg.type==="add-message"){
            const {success, data} = AddMessageSchema.safeParse(msg);
            if(!success){
                throw new Error("incorrect schema");
            }
            await SessionModel.updateOne({
                    id:data.sessionId
            },{
                conversation:{
                    $push:{
                        type:"user",
                        payload:{
                            message: data.message
                        }
                    }
                }
            })
            
            return {
                type:"message-added",
                payload:{
                    id: "1"
                }
            } 
        }

        throw new Error("incorrect input Schema")

    }
}