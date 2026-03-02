import type { RequestHandler } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

// GET /api/items
export const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM items");
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

// GET /api/items/:id
export const getById: RequestHandler = async (req, res, next) => {
	try {
		const [rows] = await client.query<RowDataPacket[]>(
			"SELECT * FROM items WHERE id = ?",
			[req.params.id],
		);

		if (rows.length === 0) {
			res.sendStatus(404);
			return;
		}

		res.json(rows[0]);
	} catch (err) {
		next(err);
	}
};

// POST /api/items
export const create: RequestHandler = async (req, res, next) => {
	try {
		const { title } = req.body;

		const [result] = await client.query<ResultSetHeader>(
			"INSERT INTO items (title) VALUES (?)",
			[title],
		);

		res.status(201).json({ id: result.insertId, title });
	} catch (err) {
		next(err);
	}
};

// PUT /api/items/:id
export const update: RequestHandler = async (req, res, next) => {
	try {
		const { title } = req.body;

		const [result] = await client.query<ResultSetHeader>(
			"UPDATE items SET title = ? WHERE id = ?",
			[title, req.params.id],
		);

		if (result.affectedRows === 0) {
			res.sendStatus(404);
			return;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

// DELETE /api/items/:id
export const destroy: RequestHandler = async (req, res, next) => {
	try {
		const [result] = await client.query<ResultSetHeader>(
			"DELETE FROM items WHERE id = ?",
			[req.params.id],
		);

		if (result.affectedRows === 0) {
			res.sendStatus(404);
			return;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
