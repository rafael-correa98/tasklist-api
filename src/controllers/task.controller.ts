import { Request, Response } from "express";
import { Task } from "../models/task";
import { TaskRepository } from "../repositories/task.repository";

export class TaskController {
    async create(request: Request, response: Response){
        const { description, detail } = request.body

        const { userId } = request.params

        const task = new Task(description, detail)

        const repository = new TaskRepository()

        await repository.createTask(userId, task)
            
        return response.status(201).json(task)
    }

    async getTask(request: Request, response: Response) {
        const {userId} = request.params

        const { description, archived } = request.query
        
        const repository = new TaskRepository();

        const tasksUser = await repository.getTasks(userId, description as string, archived as string)
        console.log(`Task controler ${tasksUser}`);
        
        return response.status(200).json(tasksUser)
    }

    async edit(request: Request, response: Response){
        const { description, detail } = request.body

        const { id } = request.params

        const repository = new TaskRepository();

        const task = await repository.editTask(id, description, detail)

        return response.status(200).json(task)
    }

    async remove(request: Request, response: Response){
        const { id } = request.params;

        const repository = new TaskRepository();

        const task = await repository.removeTask(id);

        return response.status(200).json(task);
    }

    async changeStatusArchived(request: Request, response: Response){
        const { id } = request.params;

        const { archived } = request.body;

        const repository = new TaskRepository();

        const task = await repository.updateArchived(id, archived)

        return response.status(200).json(task)
    }
}