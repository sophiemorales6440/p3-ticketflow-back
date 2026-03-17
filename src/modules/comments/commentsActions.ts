import type { RequestHandler } from "express";
import * as commentsRepository from "./commentsRepository.js";

export const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const rows = await commentsRepository.findAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

export const getById: RequestHandler = async (req, res, next) => {
	try {
		const comment = await commentsRepository.findById(String(req.params.id));
		if (!comment) {
			res.sendStatus(404);
			return;
		}
		res.json(comment);
	} catch (err) {
		next(err);
	}
};

export const create: RequestHandler = async (req, res, next) => {
	try {
		const { content, author_id, ticket_id } = req.body;
		const insertId = await commentsRepository.create(
			content,
			author_id,
			ticket_id,
		);
		res.status(201).json({ id: insertId, content, author_id, ticket_id });
	} catch (err) {
		next(err);
	}
};

export const update: RequestHandler = async (req, res, next) => {
	try {
		const { content } = req.body;
		const updated = await commentsRepository.update(
			String(req.params.id),
			content,
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

export const destroy: RequestHandler = async (req, res, next) => {
	try {
		const deleted = await commentsRepository.destroy(String(req.params.id));
		if (!deleted) {
			res.sendStatus(404);
			return;
		}
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
