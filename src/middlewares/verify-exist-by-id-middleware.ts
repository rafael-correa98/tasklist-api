import {Request, Response, NextFunction} from 'express'
import { TaskEntity } from '../database/entities/task.entity';
import { UserEntity } from '../database/entities/user.entity';
import { pgHelper } from '../database/pg-helper';

export class VerifyExistByIdMiddleware{
    async verifyUserId(request: Request, response: Response, next: NextFunction) {
        const { userId } = request.params;
        
        //responsibilidade do repository
        //usar models
        const manager = pgHelper.client.manager;

        if(userId.length != 36){
            return response.status(404).json({ error: "Usuário não encontrado" });
        }

        const user = await manager.findOne(UserEntity, {
            where: {
                id: userId
            }
        });
      
        if (!user) {
            return response.status(404).json({ message: "User não encontrado." });
        }

        next()
    }

    async verifyTaskId(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;
        
        const manager = pgHelper.client.manager;

        if(id.length != 36){
            return response.status(404).json({ error: "Recado não encontrado" });
        }

        const task = await manager.findOne(TaskEntity, {
            where: {
                id: id
            }
        });
      
        if (!task) {
            return response.status(404).json({ message: "Recado não encontrado." });
        }

        next()
    }
 }