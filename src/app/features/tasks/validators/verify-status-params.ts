import { NextFunction, Request, Response } from "express";

export class TaskArchivedParamsMiddleware {
    validateArchivedParams (request: Request, response: Response, next: NextFunction){
        const { archived } = request.body

        if(archived !== true && archived !== false) return response.status(400).json({error: "Falha ao receber o status do archived"});
        
        next() 
    }

    validateDescriptDetailParamsTask (request: Request, response: Response, next: NextFunction){
        const { description, detail } = request.body

        if(!description) return response.status(400).json({error: "O campo descrição é obrigatório"});
        if(!detail) return response.status(400).json({error: "O campo detalhamento é obrigatório"});
        
        next() 
    }
}