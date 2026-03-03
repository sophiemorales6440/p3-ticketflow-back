import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM items");
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM items WHERE id = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const create = async (title: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO items (title) VALUES (?)",
		[title],
	);
	return result.insertId;
};

export const update = async (id: string, title: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE items SET title = ? WHERE id = ?",
		[title, id],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM items WHERE id = ?",
		[id],
	);
	return result.affectedRows > 0;
};
