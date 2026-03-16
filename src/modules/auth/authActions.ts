import type { RequestHandler } from "express";
import * as authRepository from "./authRepository.js"

export const signin: RequestHandler = async (request, response, next) => {
    const { email, password } = request.body
    try {
        const isAuth = await authRepository.signin(String(email), String(password))
        if (!isAuth) {
            response.sendStatus(401);
            return;
        }

        response.json(isAuth);
    } catch (error) {
        next(error)
    }
}

export const signup: RequestHandler = async (request, response, next) => {
	try {
		const { email, password } = request.body;
		const insertId = await authRepository.signup(
			String(email),
			String(password),
		);
		response.status(201).json({ id: insertId, email });
	} catch (err) {
		next(err);
	}
};