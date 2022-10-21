import { NextFunction, Request, Response } from "express";

export class TaskArchivedParamsMiddleware {
    validateParams (request: Request, response: Response, next: NextFunction){
        const { archived } = request.body

        if(archived !== true && archived !== false) return response.status(400).json({error: "Falha ao receber o status do archived"});
        
        next() 
    }
}