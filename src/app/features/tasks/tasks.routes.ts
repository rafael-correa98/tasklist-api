import { Router } from "express";

import {  } from "../users/validators/verify-params";
import { TaskArchivedParamsMiddleware } from "./validators/verify-status-params";
import { TaskController } from "./controllers/task.controller";
import { VerifySizeIdMiddleware } from "../../shared/validators/verify-exist-by-id-middleware";

export default () => {
    const router = Router();
  
    const taskController = new TaskController();
  
    router.post('/:userId/tasks',
        new VerifySizeIdMiddleware().verifySizeUserId,
        new TaskArchivedParamsMiddleware().validateDescriptDetailParamsTask,
        taskController.create
    );

    router.get('/:userId/tasks',
        new VerifySizeIdMiddleware().verifySizeUserId,
        taskController.getTask
    );

    router.put('/:userId/tasks/:id',
        new TaskArchivedParamsMiddleware().validateDescriptDetailParamsTask,
        new VerifySizeIdMiddleware().verifySizeUserId,
        new VerifySizeIdMiddleware().VerifySizeId,
        taskController.edit
    );
    
    router.delete('/:userId/tasks/:id',
        new VerifySizeIdMiddleware().verifySizeUserId,
        new VerifySizeIdMiddleware().VerifySizeId,
        taskController.remove
    );

    router.put("/:userId/tasks/:id/archived",
        new VerifySizeIdMiddleware().verifySizeUserId,
        new VerifySizeIdMiddleware().VerifySizeId,
        new TaskArchivedParamsMiddleware().validateArchivedParams,
        taskController.changeStatusArchived
    ); 
  
    return router;
};

