import express, { Request, Response } from "express";
import { registerController } from "./controllers/auth/register/register.controller";
const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("<h1> Test </h1>");
});

router.post("/register", registerController);

export default router;
