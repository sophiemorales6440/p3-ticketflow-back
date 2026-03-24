import { checkToken } from "../middleware/authMiddleware";

describe("checkToken", () => {
	it("retourner 401 si pas de header Authorization", async () => {
		const request = { headers: {}, body: {} } as any;
		const response = { sendStatus: jest.fn() } as any;
		const next = jest.fn();

		await checkToken(request, response, next);

		expect(response.sendStatus).toHaveBeenCalledWith(401);
		expect(next).not.toHaveBeenCalled();
	});
});
