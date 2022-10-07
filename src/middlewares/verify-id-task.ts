import {Request, Response, NextFunction} from 'express'
import { usersDB } from '../db/users';

export class VerifyIdTaskMiddleware{
    verifyId(request: Request, response: Response, next: NextFunction) {
        const { userId, id } = request.params;
        
        const indexUser = usersDB.findIndex((user)=> user.id === userId);

        const task = usersDB[indexUser].tasks
        .find(task => task.id === id )

        if (!task) {
            return response.status(404).json({ message: "Recado não encontrado" });
        }

        next()
    }
 }