import { Router } from "express";
import {
	create,
	destroy,
	findByTicketId,
	getAll,
	getById,
	update,
} from "./commentsActions.js";

const router = Router();

router.get("/", getAll);
router.get("/ticket/:ticketId", findByTicketId);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
