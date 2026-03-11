import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

async function getAll() {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM categories",
	);
	return rows;
}
async function getById(id: string) {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM categories WHERE id = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
}
async function create(name: string) {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO categories (name) VALUES (?)",
		[name],
	);
	return result.insertId;
}
async function update(id: string, name: string) {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE categories SET name = ? WHERE id = ?",
		[name, id],
	);
	return result.affectedRows > 0;
}
async function destroy(id: string) {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM categories WHERE id = ?",
		[id],
	);
	return result.affectedRows > 0;
}
export { getAll, getById, create, update, destroy };
