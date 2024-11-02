import { Router } from "express";
import { errorHandler } from "../error-handler";
import * as productController from "../controllers/productContrroller";
import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";

const productRouters: Router = Router();

productRouters.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.listProducts)
);
productRouters.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.getProductById)
);

productRouters.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.createProduct)
);

productRouters.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.updateProduct)
);

productRouters.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.deleteProduct)
);

export default productRouters;
