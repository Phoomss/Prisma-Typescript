import { Router } from "express";
import authRouters from "./authRouters";

const rootRouter:Router = Router()

rootRouter.use('/auth',authRouters)

export default rootRouter

