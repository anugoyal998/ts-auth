import { registerController } from "./auth/register/register.controller";
import { loginController } from "./auth/login/login.controller"
import { whoAmIController } from "./auth/whoAmI.controller"
import { logoutController } from "./auth/logout.controller"
import { refreshController } from "./auth/refresh.controller"

const controllers = {
    registerController,
    loginController,
    whoAmIController,
    logoutController,
    refreshController
}

export default controllers;
