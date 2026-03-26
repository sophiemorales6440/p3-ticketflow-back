import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import * as authRepository from "./authRepository.js";

export const signin: RequestHandler = async (request, response, next) => {
	try {
		const { id, role, email } = request.body; // vient du middleware checkEmail
		const secret = process.env.SECRET;
		if (!secret) throw new Error("SECRET manquant");

		const userDTO = { id, role, email };
		const token = jwt.sign({ id, role }, secret, { expiresIn: "1h" });
		response.status(200).json({ userDTO, token });
	} catch (err) {
		next(err);
	}
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
