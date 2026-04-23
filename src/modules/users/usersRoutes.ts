import { Router } from "express";
import { isAdmin } from "../../middleware/authMiddleware.js";
import {
	create,
	destroy,
	getAll,
	getById,
	getTechnicianTickets,
	update,
} from "./usersControllers.js";

const router = Router();

// Admin uniquement
router.get("/", isAdmin, getAll);
router.post("/", isAdmin, create);
router.delete("/:user", isAdmin, destroy);

// Accessible à tous les rôles connectés (contrôle dans le controller)
router.get("/:user/tickets", getTechnicianTickets);
router.get("/:user", getById);
router.put("/:user", update);

export default router;
