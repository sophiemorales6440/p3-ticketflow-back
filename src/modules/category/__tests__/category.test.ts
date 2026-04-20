import "dotenv/config";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../../app.js";
import * as categoryRepository from "../categoryRepository.js";

jest.mock("../categoryRepository.js");

const mockRepo = categoryRepository as jest.Mocked<typeof categoryRepository>;

const SECRET = "test_secret";
const makeToken = (id: number, role: string) =>
	jwt.sign({ id, role }, SECRET, { expiresIn: "1h" });

beforeAll(() => {
	process.env.SECRET = SECRET;
});

afterEach(() => {
	jest.clearAllMocks();
});

// ─── GET /api/categories ──────────────────────────────────────────────────────

describe("GET /api/categories", () => {
	it("retourne 401 sans token", async () => {
		const res = await request(app).get("/api/categories");
		expect(res.status).toBe(401);
	});

	it("retourne la liste des catégories", async () => {
		const fakeCategories = [
			{ id: 1, name: "Matériel" },
			{ id: 2, name: "Logiciel" },
		];
		mockRepo.getAll.mockResolvedValueOnce(fakeCategories as never);

		const res = await request(app)
			.get("/api/categories")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		expect(res.body[0].name).toBe("Matériel");
	});

	it("retourne un tableau vide si aucune catégorie", async () => {
		mockRepo.getAll.mockResolvedValueOnce([] as never);

		const res = await request(app)
			.get("/api/categories")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(0);
	});
});

// ─── GET /api/categories/:id ──────────────────────────────────────────────────

describe("GET /api/categories/:id", () => {
	it("retourne 404 si la catégorie n'existe pas", async () => {
		mockRepo.getById.mockResolvedValueOnce(undefined);

		const res = await request(app)
			.get("/api/categories/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(404);
	});

	it("retourne la catégorie si trouvée", async () => {
		const fakeCategory = { id: 1, name: "Réseau" };
		mockRepo.getById.mockResolvedValueOnce(fakeCategory as never);

		const res = await request(app)
			.get("/api/categories/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body.name).toBe("Réseau");
	});
});

// ─── POST /api/categories ─────────────────────────────────────────────────────

describe("POST /api/categories", () => {
	it("crée une catégorie et retourne 201", async () => {
		mockRepo.create.mockResolvedValueOnce(3 as never);

		const res = await request(app)
			.post("/api/categories")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ name: "Sécurité" });

		expect(res.status).toBe(201);
		expect(res.body.id).toBe(3);
		expect(res.body.name).toBe("Sécurité");
	});
});

// ─── PUT /api/categories/:id ──────────────────────────────────────────────────

describe("PUT /api/categories/:id", () => {
	it("retourne 404 si la catégorie n'existe pas", async () => {
		mockRepo.update.mockResolvedValueOnce(false as never);

		const res = await request(app)
			.put("/api/categories/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ name: "Inexistante" });

		expect(res.status).toBe(404);
	});

	it("retourne 204 si la mise à jour réussit", async () => {
		mockRepo.update.mockResolvedValueOnce(true as never);

		const res = await request(app)
			.put("/api/categories/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ name: "Matériel informatique" });

		expect(res.status).toBe(204);
	});
});

// ─── DELETE /api/categories/:id ───────────────────────────────────────────────

describe("DELETE /api/categories/:id", () => {
	it("retourne 404 si la catégorie n'existe pas", async () => {
		mockRepo.destroy.mockResolvedValueOnce(false as never);

		const res = await request(app)
			.delete("/api/categories/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(404);
	});

	it("retourne 204 si la suppression réussit", async () => {
		mockRepo.destroy.mockResolvedValueOnce(true as never);

		const res = await request(app)
			.delete("/api/categories/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(204);
	});
});
