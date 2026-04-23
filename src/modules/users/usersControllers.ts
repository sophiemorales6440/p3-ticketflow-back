import type { RequestHandler } from "express";
import * as usersRepository from "./usersRepository.js";

export const getAll: RequestHandler = async (_request, respond, next) => {
	try {
		const rows = await usersRepository.findAll();
		respond.json(rows);
	} catch (error) {
		next(error);
	}
};

export const getById: RequestHandler = async (request, respond, next) => {
	try {
		const { userId, userRole } = request.body;
		const targetId = String(request.params.user);

		// Un client ne peut voir que son propre profil
		if (userRole === "client" && String(userId) !== targetId) {
			respond.sendStatus(403);
			return;
		}

		const user = await usersRepository.findById(targetId);
		if (!user) {
			respond.sendStatus(404);
			return;
		}
		respond.json(user);
	} catch (error) {
		next(error);
	}
};

export const create: RequestHandler = async (request, respond, next) => {
	try {
		const { firstname, lastname, email, password } = request.body;
		const insertId = await usersRepository.create(
			firstname,
			lastname,
			email,
			password,
		);
		respond.status(201).json({ id: insertId, firstname, lastname, email });
	} catch (error) {
		next(error);
	}
};

export const update: RequestHandler = async (request, respond, next) => {
	try {
		const { userId, userRole, firstname, lastname, email } = request.body;
		const targetId = String(request.params.user);

		// Un client ne peut modifier que son propre profil
		if (userRole === "client" && String(userId) !== targetId) {
			respond.sendStatus(403);
			return;
		}

		const updated = await usersRepository.update(
			targetId,
			firstname,
			lastname,
			email,
		);

		if (!updated) {
			respond.sendStatus(404);
			return;
		}
		respond.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

export const destroy: RequestHandler = async (request, respond, next) => {
	try {
		const deleted = await usersRepository.destroy(String(request.params.user));
		if (!deleted) {
			respond.sendStatus(404);
			return;
		}
		respond.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

export const getTechnicianTickets: RequestHandler = async (
	request,
	respond,
	next,
) => {
	try {
		const tickets = await usersRepository.findByTechnicianId(
			String(request.params.user),
		);
		respond.json(tickets);
	} catch (error) {
		next(error);
	}
};
