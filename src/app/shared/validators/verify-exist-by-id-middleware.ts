import {Request, Response, NextFunction} from 'express'
import databaseConnection from '../../../main/database/database-connection';
import { TaskEntity } from '../database/entities/task.entity';

export class VerifySizeIdMiddleware{
    async verifySizeUserId(request: Request, response: Response, next: NextFunction) {
        const { userId } = request.params;

        if(userId.length != 36){
            return response.status(404).json({ error: "Usuário não encontrado" });
        }

        next()
    }

    async VerifySizeId(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;

        if(id.length != 36){
            return response.status(404).json({ error: "Recado não encontrado" });
        }

        next()
    }
 }