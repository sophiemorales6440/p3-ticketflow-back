import type { ResultSetHeader } from "mysql2";
import database from "../../database/client.js";

const create = async (url: string, filename: string, ticketId: number) => {
	const [result] = await database.query<ResultSetHeader>(
		"INSERT INTO attachments (url, filename, ticket_id) VALUES (?, ?, ?)",
		[url, filename, ticketId],
	);

	return result.insertId;
};

const findByTicketId = async (ticketId: number) => {
	const [rows] = await database.query(
		"SELECT * FROM attachments WHERE ticket_id = ? ORDER BY created_at DESC",
		[ticketId],
	);

	return rows;
};

const destroy = async (id: number) => {
	const [result] = await database.query<ResultSetHeader>(
		"DELETE FROM attachments WHERE id = ?",
		[id],
	);

	return result.affectedRows > 0;
};

export default {
	create,
	findByTicketId,
	destroy,
};
