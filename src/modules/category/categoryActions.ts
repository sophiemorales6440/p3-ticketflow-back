import type { RequestHandler } from "express";
import * as categoryRepository from "./categoryRepository.js";

// GET /api/categories
const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const rows = await categoryRepository.getAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};
// GET /api/categories/:id
const getById: RequestHandler = async (req, res, next) => {
	try {
		const category = await categoryRepository.getById(String(req.params.id));
		if (!category) {
			res.sendStatus(404);
			return;
		}
		res.json(category);
	} catch (err) {
		next(err);
	}
};
// POST /api/categories
const create: RequestHandler = async (req, res, next) => {
	try {
		const { name } = req.body;
		const insertId = await categoryRepository.create(name);
		res.status(201).json({ id: insertId, name });
	} catch (err) {
		next(err);
	}
};
// PUT /api/categories/:id
const update: RequestHandler = async (req, res, next) => {
	try {
		const { name } = req.body;
		const updated = await categoryRepository.update(
			String(req.params.id),
			name,
		);
		if (!updated) {
			res.sendStatus(404);
			return;
		}
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
// DELETE /api/categories/:id
const destroy: RequestHandler = async (req, res, next) => {
	try {
		const deleted = await categoryRepository.destroy(String(req.params.id));
		if (!deleted) {
			res.sendStatus(404);
			return;
		}
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
export { getAll, getById, create, update, destroy };
