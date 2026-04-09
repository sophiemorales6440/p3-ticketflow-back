import { Router } from "express";
import attachmentsAction from "./attachmentsAction.js";

const router = Router();

router.post(
	"/tickets/:id/attachments",
	attachmentsAction.upload.single("file"),
	attachmentsAction.create,
);
router.get("/tickets/:id/attachments", attachmentsAction.findByTicketId);
router.delete("/attachments/:id", attachmentsAction.destroy);

export default router;
