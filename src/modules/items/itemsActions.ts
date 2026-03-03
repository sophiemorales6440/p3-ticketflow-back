import type { RequestHandler } from "express";
import * as itemsRepository from "./itemsRepository.js";

// GET /api/items
export const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const rows = await itemsRepository.findAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

// GET /api/items/:id
export const getById: RequestHandler = async (req, res, next) => {
	try {
		const item = await itemsRepository.findById(String(req.params.id));

		if (!item) {
			res.sendStatus(404);
			return;
		}

		res.json(item);
	} catch (err) {
		next(err);
	}
};

// POST /api/items
export const create: RequestHandler = async (req, res, next) => {
	try {
		const { title } = req.body;
		const insertId = await itemsRepository.create(title);
		res.status(201).json({ id: insertId, title });
	} catch (err) {
		next(err);
	}
};

// PUT /api/items/:id
export const update: RequestHandler = async (req, res, next) => {
	try {
		const { title } = req.body;
		const updated = await itemsRepository.update(String(req.params.id), title);

		if (!updated) {
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
		const deleted = await itemsRepository.destroy(String(req.params.id));

		if (!deleted) {
			res.sendStatus(404);
			return;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
