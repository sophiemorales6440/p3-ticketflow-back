import type { RequestHandler } from "express";
import * as ticketHistoryRepository from "../ticketHistory/ticketHistoryRepository.js";
import * as ticketsRepository from "./ticketsRepository.js";

// GET /api/tickets
export const getAll: RequestHandler = async (req, res, next) => {
	try {
		const { userId, userRole } = req.body;

		if (userRole === "client") {
			const rows = await ticketsRepository.findByClientId(String(userId));
			res.json(rows);
			return;
		}

		if (userRole === "technician") {
			const rows = await ticketsRepository.findByTechnicianId(String(userId));
			res.json(rows);
			return;
		}

		// admin → tous les tickets
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

		const changed_by = req.body.userId; // depuis le middleware d'authentification

		// Récupérer l'ancien ticket pour comparer le statut
		const oldTicket = await ticketsRepository.findById(String(req.params.id));
		if (!oldTicket) {
			res.sendStatus(404);
			return;
		}

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
		// Si le statut a changé, créer une entrée dans ticket_history
		if (oldTicket.status !== status) {
			await ticketHistoryRepository.create(
				Number(req.params.id),
				oldTicket.status,
				status,
				changed_by,
			);
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

// GET /api/tickets/technician/:id
export const getByTechnicianId: RequestHandler = async (req, res, next) => {
	try {
		const tickets = await ticketsRepository.findByTechnicianId(
			String(req.params.id),
		);
		res.json(tickets);
	} catch (err) {
		next(err);
	}
};
// GET /api/tickets/stats
export const getStats: RequestHandler = async (_req, res, next) => {
	try {
		const stats = await ticketsRepository.findStats();
		res.json(stats);
	} catch (err) {
		next(err);
	}
};
