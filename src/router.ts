import { Router } from "express";
import categoriesRoutes from "./modules/category/categoryRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";
import ticketsRoutes from "./modules/tickets/ticketsRoutes.js";
import usersRoutes from "./modules/users/usersRoutes.js";

import authRoutes from "./modules/auth/authRoutes.js";

const router = Router();

router.use("/api/auth", authRoutes);

router.use("/api/items", itemsRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/tickets", ticketsRoutes);
router.use("/api/categories", categoriesRoutes);

export default router;
