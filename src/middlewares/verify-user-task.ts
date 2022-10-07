import {Request, Response, NextFunction} from 'express'
import { usersDB } from '../db/users';

export class VerifyUserTaskMiddleware{
    verifyUser(request: Request, response: Response, next: NextFunction) {
        const { userId } = request.params;
        
        const user = usersDB.find(
            user => userId === user.id
        );
      
        if (!user) {
            return response.status(404).json({ message: "Usuário não encontrado." });
        }

        next()
    }
 }