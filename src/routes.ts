import { Express } from "express";
import { UserController } from "./controllers/user.controller";
import { TaskController } from "./controllers/task.controller";
import { CheckSingleUserMiddleware } from "./middlewares/check-single-user";
import { VerifyParamsMiddleware } from "./middlewares/verify-params";
import { UserPasswordConfirmMiddleware } from "./middlewares/user-password-confirm";
import { ValidateSizeNameMiddleware } from "./middlewares/validate-size-name";
import { VerifyExistByIdMiddleware } from "./middlewares/verify-exist-by-id-middleware";
import { TaskArchivedParamsMiddleware } from "./middlewares/verify-status-params";

export default (app: Express) => {
  
  app.get('/', (request, response) => {
    return response.send('OK');
  });
  
  const userController = new UserController();
  const taskController = new TaskController();

  app.post('/user',
    new VerifyParamsMiddleware().validateUserCreateUser,
    new ValidateSizeNameMiddleware().validateSize,
    new UserPasswordConfirmMiddleware().different, 
    new CheckSingleUserMiddleware().single, 
    userController.create);

  app.post('/user/login',
    new VerifyParamsMiddleware().validateParamsLogin,
    userController.validate);

  app.post('/user/:userId/tasks',
    new VerifyExistByIdMiddleware().verifyUserId,
    new VerifyParamsMiddleware().validateParamsTask,
    taskController.create);

  app.get('/user/:userId/tasks',
    new VerifyExistByIdMiddleware().verifyUserId,
    taskController.getTask);

  app.put('/user/:userId/tasks/:id',
    new VerifyParamsMiddleware().validateParamsTask,
    new VerifyExistByIdMiddleware().verifyUserId,
    new VerifyExistByIdMiddleware().verifyTaskId,
    taskController.edit);
    
  app.delete('/user/:userId/tasks/:id',
    new VerifyExistByIdMiddleware().verifyUserId,
    new VerifyExistByIdMiddleware().verifyTaskId,
    taskController.remove)

  app.put("/user/:userId/tasks/:id/archived",
    new VerifyExistByIdMiddleware().verifyUserId,
    new VerifyExistByIdMiddleware().verifyTaskId,
    new TaskArchivedParamsMiddleware().validateParams,
    taskController.changeStatusArchived) 
}