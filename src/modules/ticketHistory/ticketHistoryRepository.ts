import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findByTicketId = async (ticketId: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM ticket_history WHERE ticket_id = ? Order BY changed_by DESC",
		[ticketId],
	);
	return rows;
};

export const create = async (
	ticket_id: number,
	old_status: string,
	new_status: string,
	changed_by: Date,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO ticket_history (ticket_id, old_status, new_status, changed_by) VALUES (?, ?, ?, ?)",
		[ticket_id, old_status, new_status, changed_by],
	);
	return result.insertId;
};
