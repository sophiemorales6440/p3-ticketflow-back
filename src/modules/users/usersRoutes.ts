import { Router } from "express";
import {
	create,
	destroy,
	getAll,
	getById,
	update,
} from "./usersControllers.js";

const router = Router();

router.get("/", getAll);
router.get("/:user", getById);
router.post("/", create);
router.put("/:user", update);
router.delete("/:user", destroy);

export default router;
