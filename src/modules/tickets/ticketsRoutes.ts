import { Router } from "express";
import { checkToken } from "../../middleware/authMiddleware.js";
import {
	create,
	destroy,
	getAll,
	getAttachmentsByTicketId,
	getById,
	getByTechnicianId,
	getStats,
	update,
} from "./ticketsActions.js";

const router = Router();

router.get("/", checkToken, getAll);
router.get("/technician/:id", checkToken, getByTechnicianId);
router.get("/:id/attachments", checkToken, getAttachmentsByTicketId);
router.get("/:id", checkToken, getStats);
router.get("/:id", checkToken, getById);
router.post("/", checkToken, create);
router.put("/:id", checkToken, update);
router.delete("/:id", checkToken, destroy);

export default router;
