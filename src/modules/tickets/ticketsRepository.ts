import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM tickets");
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM tickets WHERE id = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const create = async (
	title: string,
	description: string,
	status: string,
	priority: string,
	client_id: number | null,
	technician_id: number | null,
	category_id: number | null,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO tickets (title, description, status, priority, client_id, technician_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
		[
			title,
			description,
			status,
			priority,
			client_id,
			technician_id,
			category_id,
		],
	);
	return result.insertId;
};

export const update = async (
	id: string,
	title: string,
	description: string,
	status: string,
	priority: string,
	client_id: number | null,
	technician_id: number | null,
	category_id: number | null,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE tickets SET title = ?, description = ?, status = ?, priority = ?, client_id = ?, technician_id = ?, category_id = ? WHERE id = ?",
		[
			title,
			description,
			status,
			priority,
			client_id,
			technician_id,
			category_id,
			id,
		],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM tickets WHERE id = ?",
		[id],
	);
	return result.affectedRows > 0;
};
