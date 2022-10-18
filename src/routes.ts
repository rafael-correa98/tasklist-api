import { Express } from "express";
import { CreateTaskController } from "./controllers/create-task";
import { CreateUserController } from "./controllers/create-user";
import { EditTaskController } from "./controllers/edit-task";
import { GetTaskController } from "./controllers/get-task";
import { LoginUserController } from "./controllers/login-user";
import { RemoveTaskController } from "./controllers/remove-task";
import { ChangeStatusArchivedController } from "./controllers/change-status-archived";
import { CheckSingleUserMiddleware } from "./middlewares/check-single-user";
import { LoginParamsUserMiddleware } from "./middlewares/login-params";
import { TaskParamsMiddleware } from "./middlewares/task-params";
import { UserPasswordConfirmMiddleware } from "./middlewares/user-password-confirm";
import { ValidateParameterUserMiddleware } from "./middlewares/validate-parameter-user";
import { ValidateSizeNameMiddleware } from "./middlewares/validate-size-name";
import { VerifyIdTaskMiddleware } from "./middlewares/verify-id-task";
import { VerifyUserTaskMiddleware } from "./middlewares/verify-user-task";
import { TaskArchivedParamsMiddleware } from "./middlewares/verify-status-params";

export default (app: Express) => {
    app.get('/', (request, response) => {
        return response.send('OK');
    });

    app.post('/user',
     new ValidateParameterUserMiddleware().validateUser,
     new ValidateSizeNameMiddleware().validateSize,
     new UserPasswordConfirmMiddleware().different, 
     new CheckSingleUserMiddleware().single, 
     new CreateUserController().create);

    app.post('/user/login',
     new LoginParamsUserMiddleware().validateParams,
     new LoginUserController().validate);

    app.post('/user/:userId/tasks',
     new VerifyUserTaskMiddleware().verifyUser,
     new TaskParamsMiddleware().validateParams,
      new CreateTaskController().create);

    app.get('/user/:userId/tasks',
     new VerifyUserTaskMiddleware().verifyUser,
     new GetTaskController().getTask);

    app.put('/user/:userId/tasks/:id',
     new VerifyUserTaskMiddleware().verifyUser,
     new VerifyIdTaskMiddleware().verifyId,
      new TaskParamsMiddleware().validateParams,
      new EditTaskController().edit);
      
    app.delete('/user/:userId/tasks/:id',
     new VerifyUserTaskMiddleware().verifyUser,
     new VerifyIdTaskMiddleware().verifyId,
     new RemoveTaskController().remove)

    app.put("/user/:userId/tasks/:id/archived",
     new VerifyUserTaskMiddleware().verifyUser,
     new VerifyIdTaskMiddleware().verifyId,
     new TaskArchivedParamsMiddleware().validateParams,
     new ChangeStatusArchivedController().change) 
}