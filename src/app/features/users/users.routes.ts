import { Router } from "express";
import { UserPasswordConfirmMiddleware } from "./validators/user-password-confirm";
import { ValidateSizeNameMiddleware } from "./validators/validate-size-name";
import { VerifyUserParamsMiddleware } from "./validators/verify-params";
import { UserController } from "./controllers/user.controller";


export default () => {
    const router = Router();
  
    const userController = new UserController();
  
    router.post('/',
      new VerifyUserParamsMiddleware().validateUserCreateUser,
      new ValidateSizeNameMiddleware().validateSize,
      new UserPasswordConfirmMiddleware().different, 
      userController.createUser
    );
  
    router.post('/login',
      new VerifyUserParamsMiddleware().validateParamsLogin,
      userController.loginUser
    );
  
    return router;
  };