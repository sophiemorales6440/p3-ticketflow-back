import { Router } from "express";
import commentsRoutes from "./modules/comments/commentsRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use("/api/comments", commentsRoutes);

export default router;
