import { Router } from "express";
import { login, signup, userInfo ,signupAdmin} from "../controllers/authController";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRouters: Router = Router();

authRouters.post("/signup", errorHandler(signup));
authRouters.post("/signup/admin", errorHandler(signupAdmin));
authRouters.post("/login", errorHandler(login));

authRouters.get("/me", [authMiddleware], errorHandler(userInfo));

export default authRouters;
