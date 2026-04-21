import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import { initSocket } from "./socket.js";

const port = Number(process.env.PORT) || 3310;

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(port, () => {
	console.info(`Server running on http://localhost:${port}`);
});
