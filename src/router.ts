import { Router } from "express";
import attachmentsRoutes from "./modules/attachments/attachmentsRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use(attachmentsRoutes);

export default router;
