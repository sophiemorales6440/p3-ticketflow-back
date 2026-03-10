import { Router } from "express";
import itemsRoutes from "./modules/items/itemsRoutes.js";
import usersRoutes from "./modules/users/usersRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use("/api/users", usersRoutes);

export default router;
