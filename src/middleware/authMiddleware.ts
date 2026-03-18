import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import * as authRepository from "../modules/auth/authRepository.js";

export const checkEmail: RequestHandler = async (request, response, next) => {
	const { email, password } = request.body;

	const isExist = await authRepository.emailExist(email);
	if (!isExist) {
		response.status(401).send({ message: "Email incorrect" });
		return;
	}

	const passwordValid = bcrypt.compareSync(password, isExist.password);
	if (!passwordValid) {
		response.status(401).send({ message: "Mauvais identifiants" });
		return;
	}
	request.body = isExist;

	next();
};

export const isAdmin: RequestHandler = async (_request, response, next) => {
	const isExist = true;

	if (!isExist) {
		response.sendStatus(401);
		return;
	}

	next();
};
