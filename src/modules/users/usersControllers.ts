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
		const users = await usersRepository.findById(String(request.params.user));
		if (!users) {
			respond.sendStatus(404);
			return;
		}
		respond.json(users);
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
		const { firstname, lastname, email } = request.body;
		const updated = await usersRepository.update(
			String(request.params.user),
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

export const getTechnicianTickets : RequestHandler = async (request, respond, next) => {
	try {
		const tickets = await usersRepository.findByTechnicianId(
			String(request.params.user),
		);
		respond.json(tickets);
	} catch (error) {
		next(error);
	}
};
