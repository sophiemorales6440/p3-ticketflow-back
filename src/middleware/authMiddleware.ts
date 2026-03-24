import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
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

export const checkToken: RequestHandler = async (request, response, next) => {
	const authorization = request.headers.authorization;

	if (!authorization) {
		response.sendStatus(401);
		return;
	}
	const token = authorization.split(" ")[1];

	const secret = process.env.SECRET;
	if (!secret) throw new Error("SECRET manquant");

	// token verification
	jwt.verify(token, secret, (error, decoded) => {
		if (error) {
			throw new Error("Problem token");
		}

		const { id, role } = decoded as { id: number; role: string };
		request.body.userId = id;
		request.body.userRole = role;
		next();
	});
};

export const isAdmin: RequestHandler = async (request, response, next) => {
	const isExist = request.body.userRole === "admin";

	if (!isExist) {
		response.sendStatus(401);
		return;
	}

	next();
};
