import { Router } from "express";
import authRouters from "./authRouters";
import productRouters from "./productRouter";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouters);
rootRouter.use("/product", productRouters);

export default rootRouter;
