import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class RemoveTaskController{
    remove(request: Request, response: Response){
        const { userId, id } = request.params;

        const user = usersDB.find((user) => user.id === id)

        const indexUser = usersDB.findIndex((user) => user.id === userId)

        const taskIndex = usersDB[indexUser].tasks
        .findIndex((task) => task.id === id)

        const task = usersDB[indexUser].tasks
        .find((task) => task.id === id)

        try {
            usersDB[indexUser].removeTask(taskIndex)
        } catch (err: any) {
            return response.status(400).json({ error: err.mensage })
        }

        return response.status(200).json({ message : `Descrição: ${task?.description}, detalhamento: ${task?.detail}, excluída com sucesso!!`} );
    }
}