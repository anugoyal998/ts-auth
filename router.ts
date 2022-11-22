import express, { NextFunction, Request, Response } from "express";
import controllers from "./controllers";
import auth from "./middlewares/auth";
const { registerController, loginController, whoAmIController, logoutController } = controllers;
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("<h1> Test </h1>");
});

router.post("/register", registerController);
router.post("/login",loginController)
router.get("/whoAmI", auth, whoAmIController);
router.post("/logout",auth,logoutController);

export default router;
