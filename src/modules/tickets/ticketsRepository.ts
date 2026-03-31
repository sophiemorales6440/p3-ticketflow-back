import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT tickets.*, categories.name AS category_name FROM tickets LEFT JOIN categories ON tickets.category_id = categories.id",
	);
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT tickets.*, categories.name AS category_name FROM tickets LEFT JOIN categories ON tickets.category_id = categories.id WHERE tickets.id = ?",
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
export const findAttachmentsByTicketId = async (ticketId: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM attachments WHERE ticket_id = ?",
		[ticketId],
	);
	return rows;
};
export const findByTechnicianId = async (technician_id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT tickets.*, categories.name AS category_name FROM tickets LEFT JOIN categories ON tickets.category_id = categories.id WHERE tickets.technician_id = ?",
		[technician_id],
	);
	return rows;
};