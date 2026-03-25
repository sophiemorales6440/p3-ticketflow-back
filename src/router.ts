import { Router } from "express";
import { checkToken } from "./middleware/authMiddleware.js";
import attachmentsRoutes from "./modules/attachments/attachmentsRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";
import categoriesRoutes from "./modules/category/categoryRoutes.js";
import commentsRoutes from "./modules/comments/commentsRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";
import ticketHistoryRoutes from "./modules/ticketHistory/ticketHistoryRoutes.js";
import ticketsRoutes from "./modules/tickets/ticketsRoutes.js";
import usersRoutes from "./modules/users/usersRoutes.js";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/ticket-history", checkToken, ticketHistoryRoutes);

router.use("/api/items", checkToken, itemsRoutes);
router.use("/api/users", checkToken, usersRoutes);
router.use("/api/tickets", checkToken, ticketsRoutes);
router.use("/api/categories", checkToken, categoriesRoutes);
router.use("/api/comments", checkToken, commentsRoutes);
router.use("/api/attachments", checkToken, attachmentsRoutes);

export default router;
