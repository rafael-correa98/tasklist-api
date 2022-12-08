import {Request, Response, NextFunction} from 'express'
import { UserEntity } from '../database/entities/user.entity';
import { pgHelper } from '../database/pg-helper';

export class CheckSingleUserMiddleware{
    async single(request: Request, response: Response, next: NextFunction) {
        const { name } = request.body


        //responsibilidade do repository
        const manager = pgHelper.client.manager;

        const user = await manager.findOne(UserEntity, {
            where: {
                name: name
            }
        });

        if (user) {
            return response.status(409).json({ error: "Usuário já existe" });
        }
      
        next()
    }
 }