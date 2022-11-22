import express, { NextFunction, Request, Response } from "express";
import controllers from "./controllers";
import auth from "./middlewares/auth";
const { registerController, loginController, whoAmIController } = controllers;
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("<h1> Test </h1>");
});

router.post("/register", registerController);
router.post("/login",loginController)
router.get("/whoAmI", auth, whoAmIController);
export default router;
