import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "./router.js";

const app = express();

// Sécurité : headers HTTP (CSP, HSTS, X-Frame-Options, etc.)
app.use(helmet());

// CORS restreint aux origines connues
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://p3-ticketflow-front.onrender.com",
		],
		credentials: true,
	}),
);

// Body parser JSON (sauf pour les uploads multipart)
app.use((req, res, next) => {
	if (req.path.startsWith("/api/attachments")) return next();
	express.json()(req, res, next);
});

// Les uploads ne sont plus servis en statique public
// Ils passent désormais par une route protégée avec checkToken

// Routes
app.use(router);

export default app;
