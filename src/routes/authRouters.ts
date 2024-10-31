import { Router } from "express";
import { login, signup } from "../controllers/authController";


const authRouters:Router = Router()

authRouters.post('/signup',signup)
authRouters.post('/login',login)

export default authRouters