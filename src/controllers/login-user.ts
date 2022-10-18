import { Request, Response } from "express";
import { usersDB } from "../db/users";

export class LoginUserController {
    validate(request: Request, response: Response){
        const { name, password } = request.body

        const user = usersDB.find(user => user.name === name && user.password === password)
        
        if (!user) {
            return response.status(404).json({ error: "Usuário não encontrado" });
        }
  
        return response.json(user.toJson());  
    }
}