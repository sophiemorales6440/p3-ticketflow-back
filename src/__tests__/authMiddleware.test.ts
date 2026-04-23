import "dotenv/config";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	checkEmail,
	checkToken,
	isAdmin,
} from "../middleware/authMiddleware.js";
import * as authRepository from "../modules/auth/authRepository.js";

jest.mock("../modules/auth/authRepository.js");

const mockAuthRepository = authRepository as jest.Mocked<typeof authRepository>;

const makeRes = () =>
	({
		sendStatus: jest.fn(),
		status: jest.fn().mockReturnValue({ send: jest.fn(), json: jest.fn() }),
		json: jest.fn(),
	}) as unknown as Response;
const makeNext = () => jest.fn();

// ─── checkToken ───────────────────────────────────────────────────────────────

describe("checkToken", () => {
	const SECRET = "test_secret";

	beforeAll(() => {
		process.env.SECRET = SECRET;
	});

	it("retourne 401 si pas de header Authorization", async () => {
		const req = { headers: {}, body: {} } as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await checkToken(req, res, next);

		expect(res.sendStatus).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});

	it("retourne 401 si le token est invalide", async () => {
		const req = {
			headers: { authorization: "Bearer token_invalide" },
			body: {},
		} as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await checkToken(req, res, next);

		expect(res.sendStatus).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});

	it("retourne 401 si le token est expiré", async () => {
		const expiredToken = jwt.sign({ id: 1, role: "admin" }, SECRET, {
			expiresIn: -1,
		});
		const req = {
			headers: { authorization: `Bearer ${expiredToken}` },
			body: {},
		} as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await checkToken(req, res, next);

		expect(res.sendStatus).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});

	it("appelle next() et injecte userId/userRole si token valide", async () => {
		const token = jwt.sign({ id: 42, role: "admin" }, SECRET, {
			expiresIn: "1h",
		});
		const req = {
			headers: { authorization: `Bearer ${token}` },
			body: {},
		} as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await checkToken(req, res, next);

		expect(next).toHaveBeenCalled();
		expect(req.body.userId).toBe(42);
		expect(req.body.userRole).toBe("admin");
	});

	it("appelle next() pour un token avec role client", async () => {
		const token = jwt.sign({ id: 7, role: "client" }, SECRET, {
			expiresIn: "1h",
		});
		const req = {
			headers: { authorization: `Bearer ${token}` },
			body: {},
		} as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await checkToken(req, res, next);

		expect(next).toHaveBeenCalled();
		expect(req.body.userId).toBe(7);
		expect(req.body.userRole).toBe("client");
	});
});

// ─── isAdmin ──────────────────────────────────────────────────────────────────

describe("isAdmin", () => {
	it("retourne 401 si le role n'est pas admin", async () => {
		const req = { body: { userRole: "client" } } as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await isAdmin(req, res, next);

		expect(res.sendStatus).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});

	it("retourne 401 si le role est technician", async () => {
		const req = { body: { userRole: "technician" } } as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await isAdmin(req, res, next);

		expect(res.sendStatus).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});

	it("appelle next() si le role est admin", async () => {
		const req = { body: { userRole: "admin" } } as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await isAdmin(req, res, next);

		expect(next).toHaveBeenCalled();
	});
});

// ─── checkEmail ───────────────────────────────────────────────────────────────

describe("checkEmail", () => {
	it("retourne 401 si l'email n'existe pas", async () => {
		mockAuthRepository.emailExist.mockResolvedValueOnce(undefined);

		const req = {
			body: { email: "inconnu@test.com", password: "password123" },
		} as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await checkEmail(req, res, next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});

	it("retourne 401 si le mot de passe est incorrect", async () => {
		mockAuthRepository.emailExist.mockResolvedValueOnce({
			id: 1,
			email: "test@test.com",
			password: "$2b$08$mauvais_hash",
			role: "client",
			firstname: "Jean",
			lastname: "Dupont",
		} as never);

		const req = {
			body: { email: "test@test.com", password: "mauvais_mdp" },
		} as unknown as Request;
		const res = makeRes();
		const next = makeNext();

		await checkEmail(req, res, next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});
});
