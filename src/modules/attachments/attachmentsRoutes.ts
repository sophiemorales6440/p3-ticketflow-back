import { Router } from "express";
import attachmentsAction from "./attachmentsAction.js";

const router = Router();

router.post("/tickets/:id/attachments", attachmentsAction.create);
router.get("/tickets/:id/attachments", attachmentsAction.findByTicketId);
router.delete("/attachments/:id", attachmentsAction.destroy);

export default router;
