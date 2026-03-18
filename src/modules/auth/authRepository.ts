import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const signin = async (email: string, password: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM users WHERE email = ? and password = ?",
		[email, password],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const signup = async (email: string, password: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO users (email, password) VALUES (?, ?)",
		[email, password],
	);
	return result.insertId;
};

export const emailExist = async (email: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * from users WHERE email = ?",
		[email],
	);

	return rows[0] as RowDataPacket | undefined;
};
