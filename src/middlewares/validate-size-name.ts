import { NextFunction, Request, Response } from "express";

export class ValidateSizeNameMiddleware {
    validateSize (request: Request, response: Response, next: NextFunction){
        const { name } = request.body;

        if(name.length < 3) return response.status(401).json({error: "O tamanho do nome não pode ser inferior a três caracteres"})
        
        next()
    }
}
