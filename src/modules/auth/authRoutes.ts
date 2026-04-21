import { Router } from "express";
import rateLimit from "express-rate-limit";
import { checkEmail } from "../../middleware/authMiddleware.js";
import { signin, signup } from "./authActions.js";

const router = Router();

// Max 10 tentatives de connexion par IP toutes les 15 minutes
const signinLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	message: {
		message: "Trop de tentatives de connexion, réessayez dans 15 minutes",
	},
	standardHeaders: true, // Renvoie les headers RateLimit-* standard
	legacyHeaders: false, // Désactive les headers X-RateLimit-* obsolètes
});

// Max 5 inscriptions par IP par heure (anti-spam)
const signupLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 5,
	message: {
		message: "Trop de tentatives d'inscription, réessayez dans 1 heure",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

router.post("/signin", signinLimiter, checkEmail, signin);
router.post("/signup", signupLimiter, signup);

export default router;
