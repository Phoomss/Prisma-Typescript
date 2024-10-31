import { Router } from "express";
import { login, signup } from "../controllers/authController";
import { errorHandler } from "../error-handler";

const authRouters: Router = Router();

authRouters.post("/signup", errorHandler(signup));
authRouters.post("/login", errorHandler(login));

export default authRouters;
