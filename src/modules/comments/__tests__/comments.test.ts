import "dotenv/config";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../../app.js";
import * as commentsRepository from "../commentsRepository.js";

jest.mock("../commentsRepository.js");

const mockRepo = commentsRepository as jest.Mocked<typeof commentsRepository>;

const SECRET = "test_secret";
const makeToken = (id: number, role: string) =>
	jwt.sign({ id, role }, SECRET, { expiresIn: "1h" });

beforeAll(() => {
	process.env.SECRET = SECRET;
});

afterEach(() => {
	jest.clearAllMocks();
});

// ─── GET /api/comments ────────────────────────────────────────────────────────

describe("GET /api/comments", () => {
	it("retourne 401 sans token", async () => {
		const res = await request(app).get("/api/comments");
		expect(res.status).toBe(401);
	});

	it("retourne la liste des commentaires", async () => {
		const fakeComments = [
			{ id: 1, content: "Commentaire 1", author_id: 1, ticket_id: 1 },
			{ id: 2, content: "Commentaire 2", author_id: 2, ticket_id: 1 },
		];
		mockRepo.findAll.mockResolvedValueOnce(fakeComments as never);

		const res = await request(app)
			.get("/api/comments")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
	});
});

// ─── GET /api/comments/:id ────────────────────────────────────────────────────

describe("GET /api/comments/:id", () => {
	it("retourne 404 si le commentaire n'existe pas", async () => {
		mockRepo.findById.mockResolvedValueOnce(undefined);

		const res = await request(app)
			.get("/api/comments/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(404);
	});

	it("retourne le commentaire si trouvé", async () => {
		const fakeComment = { id: 1, content: "Super commentaire", author_id: 1 };
		mockRepo.findById.mockResolvedValueOnce(fakeComment as never);

		const res = await request(app)
			.get("/api/comments/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body.content).toBe("Super commentaire");
	});
});

// ─── POST /api/comments ───────────────────────────────────────────────────────

describe("POST /api/comments", () => {
	it("retourne 400 si le contenu est vide", async () => {
		const res = await request(app)
			.post("/api/comments")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ content: "   ", author_id: 1, ticket_id: 1 });

		expect(res.status).toBe(400);
		expect(mockRepo.create).not.toHaveBeenCalled();
	});

	it("retourne 400 si le contenu est absent", async () => {
		const res = await request(app)
			.post("/api/comments")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ author_id: 1, ticket_id: 1 });

		expect(res.status).toBe(400);
	});

	it("crée un commentaire et retourne 201", async () => {
		mockRepo.create.mockResolvedValueOnce(7 as never);

		const res = await request(app)
			.post("/api/comments")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({
				content: "Voici mon commentaire",
				author_id: 1,
				ticket_id: 2,
				is_internal: false,
			});

		expect(res.status).toBe(201);
		expect(res.body.id).toBe(7);
		expect(res.body.content).toBe("Voici mon commentaire");
	});
});

// ─── PUT /api/comments/:id ────────────────────────────────────────────────────

describe("PUT /api/comments/:id", () => {
	it("retourne 400 si le contenu est vide", async () => {
		const res = await request(app)
			.put("/api/comments/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ content: "" });

		expect(res.status).toBe(400);
	});

	it("retourne 404 si le commentaire n'existe pas", async () => {
		mockRepo.update.mockResolvedValueOnce(false as never);

		const res = await request(app)
			.put("/api/comments/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ content: "Contenu modifié" });

		expect(res.status).toBe(404);
	});

	it("retourne 204 si la mise à jour réussit", async () => {
		mockRepo.update.mockResolvedValueOnce(true as never);

		const res = await request(app)
			.put("/api/comments/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ content: "Contenu mis à jour" });

		expect(res.status).toBe(204);
	});
});

// ─── DELETE /api/comments/:id ─────────────────────────────────────────────────

describe("DELETE /api/comments/:id", () => {
	it("retourne 404 si le commentaire n'existe pas", async () => {
		mockRepo.destroy.mockResolvedValueOnce(false as never);

		const res = await request(app)
			.delete("/api/comments/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(404);
	});

	it("retourne 204 si la suppression réussit", async () => {
		mockRepo.destroy.mockResolvedValueOnce(true as never);

		const res = await request(app)
			.delete("/api/comments/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(204);
	});
});
