import { Router } from "express";
import {
	create,
	destroy,
	getAll,
	getAttachmentsByTicketId,
	getById,
	getByTechnicianId,
	update,
} from "./ticketsActions.js";

const router = Router();

router.get("/", getAll);
router.get("/technician/:id", getByTechnicianId);
router.get("/:id/attachments", getAttachmentsByTicketId);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;