import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import * as authRepository from "./authRepository.js";

export const signin: RequestHandler = async (request, response, _next) => {
	const { user } = request.body;
	response.json(user);
};

export const signup: RequestHandler = async (request, response, next) => {
	try {
		const { email, password } = request.body;

		const salt = bcrypt.genSaltSync(8);
		const passwordHash = bcrypt.hashSync(password, salt);

		const insertId = await authRepository.signup(String(email), passwordHash);
		response.status(201).json({ id: insertId, email });
	} catch (err) {
		next(err);
	}
};
