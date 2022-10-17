import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class ChangeStatusArchivedController {
    change(request: Request, response: Response){
        const { userId, id } = request.params;
        const { archived } = request.body;

        const user = usersDB.find((user) => userId === user.id);

        const tasksFound = user?.tasks.find(
            (task) => id === task.id
          );
      
          tasksFound?.changeStatusArchived(archived)

          return response.status(200).json(tasksFound);
    }
}