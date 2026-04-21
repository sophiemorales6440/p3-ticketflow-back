import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";

const FRONT_URLS = [
	"http://localhost:5173",
	"https://p3-ticketflow-front.onrender.com",
];

let io: Server;

export const initSocket = (httpServer: HttpServer): Server => {
	io = new Server(httpServer, {
		cors: {
			origin: FRONT_URLS,
			credentials: true,
		},
	});

	io.on("connection", (socket) => {
		// Le client envoie son rôle et son id pour rejoindre la bonne room
		socket.on("join", ({ role, userId }: { role: string; userId: number }) => {
			// Chaque user rejoint sa room personnelle
			socket.join(`user:${userId}`);
			// Admin et techniciens rejoignent aussi la room "staff"
			if (role === "admin" || role === "technician") {
				socket.join("staff");
			}
		});
	});

	return io;
};

export const getIO = (): Server => {
	if (!io) throw new Error("Socket.io non initialisé");
	return io;
};
