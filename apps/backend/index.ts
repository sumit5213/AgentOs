import { WorkspaceModel } from "db/client";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";
import { CreateWorkSpaceSchema } from "commons/types";
import { UserManager } from "./UserManager";

// const dbUrl = process.env.DB_URL;

await mongoose
.connect(process.env.DB_URL!)
.then(() => {
    const server = new WebSocketServer({ port: 3000 });

    server.on("connection", (ws) => {
      UserManager.getIntance().addUser(ws);
      
    });
  })
.catch((e) => console.log(e));

