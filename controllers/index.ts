import { registerController } from "./auth/register/register.controller";
import { loginController } from "./auth/login/login.controller"
import { whoAmIController } from "./auth/whoAmI.controller"
import { logoutController } from "./auth/logout.controller"

const controllers = {
    registerController,
    loginController,
    whoAmIController,
    logoutController
}

export default controllers;
