import { Router } from "express";
import { create, destroy, getAll, getById, update } from "./itemsActions.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
