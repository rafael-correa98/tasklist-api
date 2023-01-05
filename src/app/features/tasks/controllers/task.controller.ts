import { Request, Response } from "express";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UserRepository } from "../../users/repositories/user.repository";
import { TaskRepository } from "../repositories/task.repository";
import CreateTask from "../usecases/create-task.usecase";
import DeleteTask from "../usecases/delete-task.usecase";
import EditTask from "../usecases/edit-task.usecase";
import GetTasks from "../usecases/get-tasks.usecase";
import UpdateArchivedStatus from "../usecases/update-archive-status.usecase";

export class TaskController {
    async create(request: Request, response: Response){
        try {
            const { description, detail } = request.body;
            const { userId } = request.params;    
            
            const usecase = new CreateTask(new TaskRepository(), new UserRepository(), new CacheRepository());
    
            const result = await usecase.execute({ userId, description, detail});
      
            return response.status(201).json(result.toJson())
            
        } catch (error: any) {
            return response.status(404).json({ error: error.message, stack: error })
        }
    }

    async getTask(request: Request, response: Response) {
        try {
            const {userId} = request.params;
    
            const { description, archived } = request.query;

            const usecase = new GetTasks(new TaskRepository(), new UserRepository(), new CacheRepository());
            
            const result = await usecase.execute({ userId, description: description as string, archived: archived as string })

            return response.status(200).json(result)
        } catch (error: any) {
            return response.status(404).json({ error: error.message, stack: error })
        }
    }

    async edit(request: Request, response: Response){
        try {
            const { description, detail } = request.body
    
            const { userId, id } = request.params
            
            const usecase = new EditTask(new TaskRepository(), new UserRepository(), new CacheRepository);
    
            const result = await usecase.execute({userId, id, description, detail})
    
            return response.status(200).json(result.toJson())
            
        } catch (error: any) {
            return response.status(404).json({ error: error.message, stack: error })
        }
    }

    async remove(request: Request, response: Response){
        try {
            const { userId, id } = request.params;
            
            const usecase = new DeleteTask(new TaskRepository, new UserRepository, new CacheRepository);

            const result = usecase.execute({ userId, id })

            return response.status(200).json((await result).toJson());
        } catch (error: any) {
            return response.status(404).json({ error: error.message, stack: error })
        }
    }

    async changeStatusArchived(request: Request, response: Response){
        try {
            const { userId, id } = request.params;
    
            const { archived } = request.body;

            const usecase = new UpdateArchivedStatus(new TaskRepository, new UserRepository, new CacheRepository);

            const result = await usecase.execute({ userId, id, archived })
            
            return response.status(200).json(result.toJson())
        } catch (error: any) {
            return response.status(404).json({ error: error.message, stack: error })
        }
    }
}