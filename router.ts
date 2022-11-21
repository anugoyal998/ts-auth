import express, { Request, Response } from "express";
import controllers from "./controllers";
const { registerController, loginController } = controllers;
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("<h1> Test </h1>");
});

router.post("/register", registerController);
router.post("/login",loginController)

export default router;
