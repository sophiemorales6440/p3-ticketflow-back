import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM users");
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM users WHERE id = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const create = async (
	firstname: string,
	lastname: string,
	email: string,
	password: string,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO users (firstname, lastname, email, password) VALUES (?)",
		[[firstname, lastname, email, password]],
	);
	return result.insertId;
};

export const update = async (
	id: string,
	firstname: string,
	lastname: string,
	email: string,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?",
		[firstname, lastname, email, id],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM users WHERE id = ?",
		[id],
	);
	return result.affectedRows > 0;
};
