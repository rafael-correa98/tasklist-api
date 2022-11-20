import {Request, Response, NextFunction} from 'express'

export class UserPasswordConfirmMiddleware{
    different(request: Request, response: Response, next: NextFunction) {
        const { password, repeatPassword } = request.body

        if (password !== repeatPassword) {
            return response.status(400).json({ error: "Campos de senhas devem ser iguais" });
        }
      
        next()
    }
 }