import { Request, Response } from "express";
import { User } from "../../../models/user";
import { UserRepository } from "../repositories/user.repository";
import CreateUser from "../usecases/create-user.usecase";
import LoginUser from "../usecases/login-user.usercase";


export class UserController {
    async createUser(request: Request, response: Response){
        try {
            const usecase = new CreateUser(new UserRepository());

            const result = await usecase.execute(request.body);
            
            return response.json(result.toJson());
        } catch (error: any) {
            return response.status(409).json({ error: error.message, stack: error })
        }
    }

    async loginUser(request: Request, response: Response){
        
        try {
            const usecase = new LoginUser(new UserRepository())

            const result = await usecase.execute(request.body)
            
            return response.status(200).json(result.toJson())
        } catch (error: any) {
            return response.status(400).json({ error: error.message, stack: error })
        }
    }
}