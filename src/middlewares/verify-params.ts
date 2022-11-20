import { NextFunction, Request, Response } from "express";

export class VerifyParamsMiddleware {
    validateUserCreateUser (request: Request, response: Response, next: NextFunction){
        const { name, password, repeatPassword } = request.body;

        if(!name) return response.status(400).json({error: "O campo name é obrigatório"});
        if(!password) return response.status(400).json({error: "O campo password é obrigatório"});
        if(!repeatPassword) return response.status(400).json({error: "O campo confirm password é obrigatório"});
        
        next() 
    }

    validateParamsLogin (request: Request, response: Response, next: NextFunction){
        const { name, password } = request.body;

        if(!name) return response.status(400).json({error: "O campo name é obrigatório"});
        if(!password) return response.status(400).json({error: "O campo password é obrigatório"});
        
        next() 
    }

    validateParamsTask (request: Request, response: Response, next: NextFunction){
        const { description, detail } = request.body

        if(!description) return response.status(400).json({error: "O campo descrição é obrigatório"});
        if(!detail) return response.status(400).json({error: "O campo detalhamento é obrigatório"});
        
        next() 
    }
}