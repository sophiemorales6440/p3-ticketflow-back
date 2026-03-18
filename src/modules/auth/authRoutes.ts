import { Router } from "express";
import { signin, signup } from "./authActions.js";
import { checkEmail } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/signin", checkEmail, signin);
router.post("/signup", signup);

export default router;
