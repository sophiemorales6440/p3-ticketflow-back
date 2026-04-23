import fs from "node:fs";
import path from "node:path";
import type { ErrorRequestHandler } from "express";
import { Router } from "express";
import { checkToken } from "./middleware/authMiddleware.js";
import { handleMulterError } from "./modules/attachments/attachmentsAction.js";
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

// Middleware d'erreur multer — cast requis car TypeScript exige ErrorRequestHandler
router.use(handleMulterError as ErrorRequestHandler);

// Route protégée pour les fichiers uploadés (remplace express.static)
router.get("/uploads/:filename", checkToken, (req, res) => {
	// String() évite l'ambiguïté string | string[] d'Express v5
	const filename = path.basename(String(req.params.filename));
	const filePath = path.resolve("uploads", filename);

	if (!fs.existsSync(filePath)) {
		res.sendStatus(404);
		return;
	}

	res.sendFile(filePath);
});

export default router;
