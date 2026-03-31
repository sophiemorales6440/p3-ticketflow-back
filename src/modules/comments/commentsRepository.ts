import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM comments");
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM comments where id = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const create = async (
	content: string,
	author_id: number,
	ticket_id: number,
	is_internal: boolean,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO comments (content, author_id, ticket_id, is_internal) VALUES (?, ?, ?, ?)",
		[content, author_id, ticket_id, is_internal],
	);
	return result.insertId;
};

export const findByTicketId = async (ticketId: string, role: string) => {
	if (role === "client") {
		const [rows] = await client.query<RowDataPacket[]>(
			"SELECT comments.*, users.firstname, users.lastname, users.role FROM comments JOIN users ON comments.author_id = users.id WHERE comments.ticket_id = ? AND comments.is_internal = 0 ORDER BY comments.created_at ASC",
			[ticketId],
		);
		return rows;
	}
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT comments.*, users.firstname, users.lastname, users.role FROM comments JOIN users ON comments.author_id = users.id WHERE comments.ticket_id = ? ORDER BY comments.created_at ASC",
		[ticketId],
	);
	return rows;
};

export const update = async (id: string, content: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE comments SET content = ? WHERE id = ? ",
		[content, id],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM comments WHERE id= ?",
		[id],
	);
	return result.affectedRows > 0;
};
