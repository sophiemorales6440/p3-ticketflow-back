import type { RequestHandler } from "express";
import * as ticketHistoryRepository from "./ticketHistoryRepository.js";

// GET /api/tickets/:ticketId/history
export const getByTicketId: RequestHandler = async (req, res, next) => {
	try {
		const rows = await ticketHistoryRepository.findByTicketId(
			String(req.params.ticketId),
		);
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

// POST /api/tickets/:ticketId/history
export const create: RequestHandler = async (req, res, next) => {
	try {
		const { old_status, new_status } = req.body;
		const ticketId = Number(req.params.ticketId);
		const changed_at = new Date();
		const insertId = await ticketHistoryRepository.create(
			ticketId,
			old_status,
			new_status,
			changed_at,
		);
		res.status(201).json({
			id: insertId,
			ticket_id: ticketId,
			old_status,
			new_status,
			changed_at,
		});
	} catch (err) {
		next(err);
	}
};
