import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class GetTaskController {
  getTask(request: Request, response: Response) {
    const {userId} = request.params
    
    const userIndex = usersDB.findIndex(user => user.id === userId)

    let tasks = usersDB[userIndex].tasks.map(task => task.toJson())
    
    return response.json(tasks)
  }
}