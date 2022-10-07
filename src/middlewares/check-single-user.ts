import {Request, Response, NextFunction} from 'express'
import { usersDB } from '../db/users'

export class CheckSingleUserMiddleware{
    single(request: Request, response: Response, next: NextFunction) {
        const { name, password } = request.body
        
        const user = usersDB.find(user => user.name === name && user.password === password)

        if (user) {
            return response.status(404).json({ error: "Usuário já existe" });
        }
      
        next()
    }
 }