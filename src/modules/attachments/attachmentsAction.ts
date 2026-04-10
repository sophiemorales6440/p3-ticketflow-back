import type { Request, Response } from "express";
import multer from "multer";
import { findById } from "../tickets/ticketsRepository.js";
import attachmentsRepository from "./attachmentsRepository.js";

const create = async (req: Request, res: Response) => {
	try {
		const ticketId = Number(req.params.id);
		if(!req.file){
			return res.status(400).json({ error: "No file uploaded" });
		}
		const filename = req.file.filename;
		const url = `/uploads/${req.file.filename}`;

		// Vérification : le ticket existe (findById attend un string)
		const ticket = await findById(String(ticketId));
		if (!ticket) {
			return res.status(404).json({ error: "Ticket not found" });
		}

		const id = await attachmentsRepository.create(url, filename, ticketId);

		return res.status(201).json({ id, url, filename, ticketId });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const findByTicketId = async (req: Request, res: Response) => {
	try {
		const ticketId = Number(req.params.id);

		const attachments = await attachmentsRepository.findByTicketId(ticketId);

		return res.status(200).json(attachments);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);

		const deleted = await attachmentsRepository.destroy(id);

		if (!deleted) {
			return res.status(404).json({ error: "Attachment not found" });
		}

		return res.status(200).json({ message: "Attachment deleted" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const storage = multer.diskStorage({
	destination: "uploads/",
	filename: (_request: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
		callback(null, file.originalname);
	},
});

const upload = multer({ storage });

export default {
	create,
	findByTicketId,
	destroy,
	upload,
};
