import "dotenv/config";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../../app.js";
import * as ticketsRepository from "../ticketsRepository.js";

jest.mock("../ticketsRepository.js");
jest.mock("../../ticketHistory/ticketHistoryRepository.js");

const mockRepo = ticketsRepository as jest.Mocked<typeof ticketsRepository>;

const SECRET = "test_secret";

const makeToken = (id: number, role: string) =>
	jwt.sign({ id, role }, SECRET, { expiresIn: "1h" });

beforeAll(() => {
	process.env.SECRET = SECRET;
});

afterEach(() => {
	jest.clearAllMocks();
});

// ─── GET /api/tickets ─────────────────────────────────────────────────────────

describe("GET /api/tickets", () => {
	it("retourne 401 sans token", async () => {
		const res = await request(app).get("/api/tickets");
		expect(res.status).toBe(401);
	});

	it("retourne tous les tickets pour un admin", async () => {
		const fakeTickets = [
			{ id: 1, title: "Ticket A", status: "open", priority: "high" },
			{ id: 2, title: "Ticket B", status: "closed", priority: "low" },
		];
		mockRepo.findAll.mockResolvedValueOnce(fakeTickets as never);

		const res = await request(app)
			.get("/api/tickets")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
	});

	it("retourne uniquement les tickets du client connecté", async () => {
		const fakeTickets = [{ id: 3, title: "Mon ticket", client_id: 5 }];
		mockRepo.findByClientId.mockResolvedValueOnce(fakeTickets as never);

		const res = await request(app)
			.get("/api/tickets")
			.set("Authorization", `Bearer ${makeToken(5, "client")}`);

		expect(res.status).toBe(200);
		expect(mockRepo.findByClientId).toHaveBeenCalledWith("5");
		expect(mockRepo.findAll).not.toHaveBeenCalled();
	});

	it("retourne uniquement les tickets du technicien connecté", async () => {
		const fakeTickets = [{ id: 4, title: "Ticket tech", technician_id: 3 }];
		mockRepo.findByTechnicianId.mockResolvedValueOnce(fakeTickets as never);

		const res = await request(app)
			.get("/api/tickets")
			.set("Authorization", `Bearer ${makeToken(3, "technician")}`);

		expect(res.status).toBe(200);
		expect(mockRepo.findByTechnicianId).toHaveBeenCalledWith("3");
	});
});

// ─── GET /api/tickets/:id ─────────────────────────────────────────────────────

describe("GET /api/tickets/:id", () => {
	it("retourne 404 si le ticket n'existe pas", async () => {
		mockRepo.findById.mockResolvedValueOnce(undefined);

		const res = await request(app)
			.get("/api/tickets/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(404);
	});

	it("retourne le ticket si trouvé", async () => {
		const fakeTicket = { id: 1, title: "Ticket A", status: "open" };
		mockRepo.findById.mockResolvedValueOnce(fakeTicket as never);

		const res = await request(app)
			.get("/api/tickets/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body.title).toBe("Ticket A");
	});
});

// ─── POST /api/tickets ────────────────────────────────────────────────────────

describe("POST /api/tickets", () => {
	it("crée un ticket et retourne 201", async () => {
		mockRepo.create.mockResolvedValueOnce(10 as never);

		const res = await request(app)
			.post("/api/tickets")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({
				title: "Nouveau ticket",
				description: "Description",
				status: "open",
				priority: "medium",
				client_id: 2,
				technician_id: null,
				category_id: 1,
			});

		expect(res.status).toBe(201);
		expect(res.body.id).toBe(10);
		expect(res.body.title).toBe("Nouveau ticket");
	});

	it("retourne 401 sans token", async () => {
		const res = await request(app).post("/api/tickets").send({
			title: "Ticket sans auth",
		});

		expect(res.status).toBe(401);
	});
});

// ─── PUT /api/tickets/:id ─────────────────────────────────────────────────────

describe("PUT /api/tickets/:id", () => {
	it("retourne 404 si le ticket n'existe pas", async () => {
		mockRepo.findById.mockResolvedValueOnce(undefined);

		const res = await request(app)
			.put("/api/tickets/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({
				title: "Titre",
				description: "Desc",
				status: "open",
				priority: "low",
			});

		expect(res.status).toBe(404);
	});

	it("retourne 204 si la mise à jour réussit", async () => {
		const oldTicket = { id: 1, title: "Ancien", status: "open" };
		mockRepo.findById.mockResolvedValueOnce(oldTicket as never);
		mockRepo.update.mockResolvedValueOnce(true as never);

		const res = await request(app)
			.put("/api/tickets/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({
				title: "Nouveau titre",
				description: "Desc",
				status: "open",
				priority: "low",
				client_id: 1,
				technician_id: null,
				category_id: 1,
			});

		expect(res.status).toBe(204);
	});
});

// ─── DELETE /api/tickets/:id ──────────────────────────────────────────────────

describe("DELETE /api/tickets/:id", () => {
	it("retourne 404 si le ticket n'existe pas", async () => {
		mockRepo.destroy.mockResolvedValueOnce(false as never);

		const res = await request(app)
			.delete("/api/tickets/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(404);
	});

	it("retourne 204 si la suppression réussit", async () => {
		mockRepo.destroy.mockResolvedValueOnce(true as never);

		const res = await request(app)
			.delete("/api/tickets/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(204);
	});
});
