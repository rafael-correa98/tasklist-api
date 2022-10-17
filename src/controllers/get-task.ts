import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class GetTaskController {
  getTask(request: Request, response: Response) {
    const {userId} = request.params
    const { description, archived } = request.query
    
    const user = usersDB.find((user) => userId === user.id);

    const tasks = user?.tasks.filter((task) => {
      let filterDescription = true;
      let filterArchived = true;

      if (description) {
        filterDescription = task.description
          .toLowerCase()
          .includes(description.toString().toLowerCase());
      }
      if (archived) {
        filterArchived =
          task.archived === (archived === "true" ? true : false);
      }
      return filterDescription && filterArchived;
    });
    
    return response.json(tasks)
  }
}