import { Router } from "express";
import { checkEmail } from "../../middleware/authMiddleware.js";
import { signin, signup } from "./authActions.js";

const router = Router();

router.post("/signin", checkEmail, signin);
router.post("/signup", signup);

export default router;
