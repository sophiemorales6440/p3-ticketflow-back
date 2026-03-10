import { Router } from "express";
import categoriesRoutes from "./modules/category/categoryRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use("/api/categories", categoriesRoutes);

export default router;
