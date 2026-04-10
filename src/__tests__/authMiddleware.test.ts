import type { NextFunction, Request, Response } from "express";
import { checkToken } from "../middleware/authMiddleware.js";

describe("checkToken", () => {
	it("retourner 401 si pas de header Authorization", async () => {
		const request = { headers: {}, body: {} } as unknown as Request;
		const response = { sendStatus: jest.fn() } as unknown as Response;
		const next = jest.fn() as unknown as NextFunction;

		await checkToken(request, response, next);

		expect(response.sendStatus).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});
});
