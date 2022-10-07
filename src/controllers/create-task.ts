import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { Task } from "../models/task";

export class CreateTaskController {
    create(request: Request, response: Response){
        const { description, detail } = request.body

        const { userId } = request.params

        const task = new Task(description, detail)

        const user = usersDB.find(user => user.id === userId)
            
        if (!user) {
            return response.status(404).json({ error: "Usuário não encontrado" });
        }
        
        try { 
            user.newTask(task);
  
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }

        return response.json(task.toJson())
    }
}