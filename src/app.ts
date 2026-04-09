import cors from "cors";
import express from "express";
import router from "./router.js";

const app = express();

// Middlewares
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://p3-ticketflow-front.onrender.com",
		],
	}),
);
app.use((req, res, next) => {
  if (req.path.startsWith("/api/attachments")) return next();
  express.json()(req, res, next);
});

app.use("/uploads", express.static("uploads"));

// Routes
app.use(router);

export default app;
