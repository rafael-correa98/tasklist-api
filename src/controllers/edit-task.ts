import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class EditTaskController{
    edit(request: Request, response: Response){
        const { description, detail } = request.body

        const { userId, id } = request.params

        const userIndex = usersDB.findIndex(user => user.id === userId)

        const task = usersDB[userIndex].tasks
        .find((task) => task.id === id)

        if (!task){
            return response.status(404).json({ error: "Recado não encontrado"})
        }

        try{
            task.updateInformation(description, detail)
        } catch (err: any){
            return response.status(400).json({ error: err.message })
        }

        return response.json(task.toJson())
    }
}