import { Request, Response } from "express";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
    async create(request: Request, response: Response){
        const { name, password } = request.body

        const user = new User(name, password)

        const repository = new UserRepository();

        await repository.createUser(user)
        
        return response.status(201).json(user)
    }

    async validate(request: Request, response: Response){
        const { name, password } = request.body
        
        const repository = new UserRepository();

        try {
            const user = await repository.validateUser(name, password)
            return response.status(200).json(user)
        } catch (err: any) {
            return response.status(401).json({ error: "Usuário não encontrado" })
        }
    }
}