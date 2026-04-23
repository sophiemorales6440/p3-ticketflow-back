import "dotenv/config";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../../../app.js";
import * as usersRepository from "../usersRepository.js";

jest.mock("../usersRepository.js");

const mockRepo = usersRepository as jest.Mocked<typeof usersRepository>;

const SECRET = "test_secret";
const makeToken = (id: number, role: string) =>
	jwt.sign({ id, role }, SECRET, { expiresIn: "1h" });

beforeAll(() => {
	process.env.SECRET = SECRET;
});

afterEach(() => {
	jest.clearAllMocks();
});

// ─── GET /api/users ───────────────────────────────────────────────────────────

describe("GET /api/users", () => {
	it("retourne 401 sans token", async () => {
		const res = await request(app).get("/api/users");
		expect(res.status).toBe(401);
	});

	it("retourne la liste des utilisateurs", async () => {
		const fakeUsers = [
			{
				id: 1,
				firstname: "Alice",
				lastname: "Martin",
				email: "alice@test.com",
				role: "admin",
			},
			{
				id: 2,
				firstname: "Bob",
				lastname: "Dupont",
				email: "bob@test.com",
				role: "client",
			},
		];
		mockRepo.findAll.mockResolvedValueOnce(fakeUsers as never);

		const res = await request(app)
			.get("/api/users")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		expect(res.body[0].firstname).toBe("Alice");
	});
});

// ─── GET /api/users/:user ─────────────────────────────────────────────────────

describe("GET /api/users/:user", () => {
	it("retourne 404 si l'utilisateur n'existe pas", async () => {
		mockRepo.findById.mockResolvedValueOnce(undefined);

		const res = await request(app)
			.get("/api/users/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(404);
	});

	it("retourne l'utilisateur si trouvé", async () => {
		const fakeUser = { id: 1, firstname: "Alice", email: "alice@test.com" };
		mockRepo.findById.mockResolvedValueOnce(fakeUser as never);

		const res = await request(app)
			.get("/api/users/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(200);
		expect(res.body.firstname).toBe("Alice");
	});
});

// ─── POST /api/users ──────────────────────────────────────────────────────────

describe("POST /api/users", () => {
	it("crée un utilisateur et retourne 201", async () => {
		mockRepo.create.mockResolvedValueOnce(5 as never);

		const res = await request(app)
			.post("/api/users")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({
				firstname: "Claire",
				lastname: "Durand",
				email: "claire@test.com",
				password: "motdepasse",
			});

		expect(res.status).toBe(201);
		expect(res.body.id).toBe(5);
		expect(res.body.email).toBe("claire@test.com");
	});
});

// ─── PUT /api/users/:user ─────────────────────────────────────────────────────

describe("PUT /api/users/:user", () => {
	it("retourne 404 si l'utilisateur n'existe pas", async () => {
		mockRepo.update.mockResolvedValueOnce(false as never);

		const res = await request(app)
			.put("/api/users/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({ firstname: "X", lastname: "Y", email: "x@test.com" });

		expect(res.status).toBe(404);
	});

	it("retourne 204 si la mise à jour réussit", async () => {
		mockRepo.update.mockResolvedValueOnce(true as never);

		const res = await request(app)
			.put("/api/users/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`)
			.send({
				firstname: "Alice",
				lastname: "Martin",
				email: "alice@test.com",
			});

		expect(res.status).toBe(204);
	});
});

// ─── DELETE /api/users/:user ──────────────────────────────────────────────────

describe("DELETE /api/users/:user", () => {
	it("retourne 404 si l'utilisateur n'existe pas", async () => {
		mockRepo.destroy.mockResolvedValueOnce(false as never);

		const res = await request(app)
			.delete("/api/users/999")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(404);
	});

	it("retourne 204 si la suppression réussit", async () => {
		mockRepo.destroy.mockResolvedValueOnce(true as never);

		const res = await request(app)
			.delete("/api/users/1")
			.set("Authorization", `Bearer ${makeToken(1, "admin")}`);

		expect(res.status).toBe(204);
	});
});
