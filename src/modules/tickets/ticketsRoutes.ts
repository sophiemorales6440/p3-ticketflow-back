import { Router } from "express";
import {
	create,
	destroy,
	getAll,
	getAttachmentsByTicketId,
	getById,
	update,
} from "./ticketsActions.js";

const router = Router();

router.get("/", getAll);

// 👉 AJOUT DE LA ROUTE MANQUANTE
router.get("/:id/attachments", getAttachmentsByTicketId);

router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
