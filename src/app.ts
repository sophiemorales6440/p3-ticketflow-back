import cors from "cors";
import express from "express";
import router from "./router.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(router);

export default app;
