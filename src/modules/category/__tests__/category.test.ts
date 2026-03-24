import "dotenv/config";
import request from "supertest";
import app from "../../../app.js";
import client from "../../../database/client.js";

describe("Category object", () => {
	it("should have an id and a name", () => {
		const category = { id: 1, name: "Matériel" };

		expect(category).toHaveProperty("id");
		expect(category).toHaveProperty("name");
		expect(typeof category.name).toBe("string");
	});
});

describe("GET /api/categories", () => {
	it("should return a 200 status", async () => {
		const response = await request(app).get("/api/categories");
		expect(response.status).toBe(200);
	});
});
afterAll(async () => {
	await client.end();
});
