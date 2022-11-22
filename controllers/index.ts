import { registerController } from "./auth/register/register.controller";
import { loginController } from "./auth/login/login.controller"
import { whoAmIController } from "./auth/whoAmI.controller"

const controllers = {
    registerController,
    loginController,
    whoAmIController
}

export default controllers;
