import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import * as authRepository from "./authRepository.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateSignup = (
	email: unknown,
	password: unknown,
	firstname: unknown,
	lastname: unknown,
): string | null => {
	if (!firstname || typeof firstname !== "string" || !firstname.trim()) {
		return "Le prénom est requis";
	}
	if (firstname.trim().length > 45) {
		return "Le prénom ne peut pas dépasser 45 caractères";
	}
	if (!lastname || typeof lastname !== "string" || !lastname.trim()) {
		return "Le nom est requis";
	}
	if (lastname.trim().length > 45) {
		return "Le nom ne peut pas dépasser 45 caractères";
	}
	if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
		return "Email invalide";
	}
	if (email.length > 100) {
		return "Email trop long";
	}
	if (!password || typeof password !== "string") {
		return "Le mot de passe est requis";
	}
	if (password.length < 8) {
		return "Le mot de passe doit faire au moins 8 caractères";
	}
	if (password.length > 128) {
		return "Le mot de passe est trop long";
	}
	return null;
};

export const signin: RequestHandler = async (request, response, next) => {
	try {
		const { id, role, email, firstname, lastname } = request.body;
		const secret = process.env.SECRET;
		if (!secret) throw new Error("SECRET manquant");

		const userDTO = { id, role, email, firstname, lastname };
		const token = jwt.sign({ id, role, firstname, lastname }, secret, {
			expiresIn: "1h",
		});
		response.status(200).json({ userDTO, token });
	} catch (err) {
		next(err);
	}
};

export const signup: RequestHandler = async (request, response, next) => {
	try {
		const { email, password, firstname, lastname } = request.body;

		// Validation côté serveur (indépendante du front)
		const validationError = validateSignup(
			email,
			password,
			firstname,
			lastname,
		);
		if (validationError) {
			response.status(400).json({ message: validationError });
			return;
		}

		// Vérifier si l'email est déjà utilisé
		const existing = await authRepository.emailExist(email);
		if (existing) {
			response.status(409).json({ message: "Cet email est déjà utilisé" });
			return;
		}

		const salt = bcrypt.genSaltSync(12);
		const passwordHash = bcrypt.hashSync(password, salt);

		const insertId = await authRepository.signup(
			String(email).toLowerCase().trim(),
			passwordHash,
			String(firstname).trim(),
			String(lastname).trim(),
		);
		response.status(201).json({ id: insertId, email });
	} catch (err) {
		next(err);
	}
};
