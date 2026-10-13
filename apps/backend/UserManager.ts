
import {WebSocket} from "ws";
import { User } from "./User";
import { uuid } from "uuidv4";


export class UserManager{
    private users: User[];
    private static instance = UserManager;
    private constructor(){
        this.users = []
    }

    static getIntance(): UserManager{
        if(UserManager.instance){   
            return new UserManager.instance;
        }

        UserManager.instance = new UserManager();
        return new UserManager.instance;
    }

    addUser(ws: WebSocket){
        const id = uuid();
        const user = new User(id,ws);
        this.users.push(user)
        ws.on("message", async (msg) => {
        try{
          const parsedMessage = JSON.parse(msg.toString());
          const responsePayload = await user.handleIncommingMessage(parsedMessage);
          user.sendMessage(responsePayload); 
          
        }catch(e){
          console.log("user sent non json format")
          console.log(msg.toString())
        }
      });

      ws.on("close",()=>{
        this.users = this.users.filter(x=>x.id != id)
      })
    }
}