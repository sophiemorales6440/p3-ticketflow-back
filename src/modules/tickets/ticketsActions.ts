import type { RequestHandler } from "express";
import * as ticketsRepository from "./ticketsRepository.js";

// GET /api/tickets
export const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const rows = await ticketsRepository.findAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

// GET /api/tickets/:id
export const getById: RequestHandler = async (req, res, next) => {
	try {
		const ticket = await ticketsRepository.findById(String(req.params.id));

		if (!ticket) {
			res.sendStatus(404);
			return;
		}

		res.json(ticket);
	} catch (err) {
		next(err);
	}
};

// POST /api/tickets
export const create: RequestHandler = async (req, res, next) => {
	try {
		const {
			title,
			description,
			status,
			priority,
			client_id,
			technician_id,
			category_id,
		} = req.body;
		const insertId = await ticketsRepository.create(
			title,
			description,
			status,
			priority,
			client_id,
			technician_id,
			category_id,
		);
		res.status(201).json({
			id: insertId,
			title,
			description,
			status,
			priority,
			client_id,
			technician_id,
			category_id,
		});
	} catch (err) {
		next(err);
	}
};

// PUT /api/tickets/:id
export const update: RequestHandler = async (req, res, next) => {
	try {
		const {
			title,
			description,
			status,
			priority,
			client_id,
			technician_id,
			category_id,
		} = req.body;
		const updated = await ticketsRepository.update(
			String(req.params.id),
			title,
			description,
			status,
			priority,
			client_id,
			technician_id,
			category_id,
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

// DELETE /api/tickets/:id
export const destroy: RequestHandler = async (req, res, next) => {
	try {
		const deleted = await ticketsRepository.destroy(String(req.params.id));

		if (!deleted) {
			res.sendStatus(404);
			return;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
// GET /api/tickets/:id/attachments
export const getAttachmentsByTicketId: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		const ticketId = String(req.params.id);

		// Vérifier que le ticket existe
		const ticket = await ticketsRepository.findById(ticketId);
		if (!ticket) {
			res.status(404).json({ message: "Ticket introuvable" });
			return;
		}

		// Récupérer les attachments
		const attachments =
			await ticketsRepository.findAttachmentsByTicketId(ticketId);

		res.json(attachments);
	} catch (err) {
		next(err);
	}
};
