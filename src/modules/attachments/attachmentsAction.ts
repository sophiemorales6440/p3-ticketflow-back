import crypto from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import type { NextFunction, Request, Response } from "express";
import { findById } from "../tickets/ticketsRepository.js";
import attachmentsRepository from "./attachmentsRepository.js";
import type { MulterFile, MulterOptions, MulterStatic } from "./multerTypes.js";

const require = createRequire(import.meta.url);
const multer = require("multer") as MulterStatic;

const ALLOWED_EXTENSIONS = [
	".gif",
	".jpeg",
	".jpg",
	".pdf",
	".png",
	".txt",
	".webp",
];
const ALLOWED_MIME_TYPES = [
	"application/pdf",
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/webp",
	"text/plain",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
	destination: "uploads/",
	filename(
		_req: Request,
		file: MulterFile,
		callback: (error: Error | null, filename: string) => void,
	) {
		const ext = path.extname(file.originalname).toLowerCase();
		callback(null, `${crypto.randomUUID()}-${Date.now()}${ext}`);
	},
});

const multerOptions: MulterOptions = {
	fileFilter(
		_req: Request,
		file: MulterFile,
		cb: (error: Error | null, acceptFile?: boolean) => void,
	) {
		const ext = path.extname(file.originalname).toLowerCase();
		if (
			!ALLOWED_MIME_TYPES.includes(file.mimetype) ||
			!ALLOWED_EXTENSIONS.includes(ext)
		) {
			cb(new Error("Type de fichier non autorisé"));
			return;
		}
		cb(null, true);
	},
	limits: { fileSize: MAX_FILE_SIZE },
	storage,
};

const upload = multer(multerOptions);

const create = async (req: Request, res: Response) => {
	try {
		const ticketId = Number(req.params.id);
		if (!req.file) {
			return res.status(400).json({ error: "Aucun fichier reçu" });
		}
		const ticket = await findById(String(ticketId));
		if (!ticket) {
			fs.unlink(req.file.path, () => {});
			return res.status(404).json({ error: "Ticket introuvable" });
		}
		const { filename } = req.file;
		const url = `/uploads/${filename}`;
		const id = await attachmentsRepository.create(url, filename, ticketId);
		return res.status(201).json({ id, url, filename, ticketId });
	} catch (error) {
		if (req.file) fs.unlink(req.file.path, () => {});
		console.error(error);
		return res.status(500).json({ error: "Erreur interne du serveur" });
	}
};

const findByTicketId = async (req: Request, res: Response) => {
	try {
		const ticketId = Number(req.params.id);
		const attachments = await attachmentsRepository.findByTicketId(ticketId);
		return res.status(200).json(attachments);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Erreur interne du serveur" });
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id);
		const deleted = await attachmentsRepository.destroy(id);
		if (!deleted)
			return res.status(404).json({ error: "Pièce jointe introuvable" });
		return res.status(200).json({ message: "Pièce jointe supprimée" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Erreur interne du serveur" });
	}
};

export const handleMulterError = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const multerErr = err as Error & { code?: string };
	if (multerErr.code === "LIMIT_FILE_SIZE") {
		return res
			.status(400)
			.json({ error: "Fichier trop volumineux (5 Mo max)" });
	}
	if (err) return res.status(400).json({ error: err.message });
	_next();
};

export default { create, destroy, findByTicketId, upload };
