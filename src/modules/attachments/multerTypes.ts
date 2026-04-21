import type { Request, RequestHandler } from "express";

export interface MulterFile {
	buffer: Buffer;
	destination: string;
	encoding: string;
	fieldname: string;
	filename: string;
	mimetype: string;
	originalname: string;
	path: string;
	size: number;
}

export interface DiskStorageOptions {
	destination?:
		| string
		| ((
				req: Request,
				file: MulterFile,
				callback: (error: Error | null, destination: string) => void,
		  ) => void);
	filename?(
		req: Request,
		file: MulterFile,
		callback: (error: Error | null, filename: string) => void,
	): void;
}

export interface MulterOptions {
	dest?: string;
	fileFilter?(
		req: Request,
		file: MulterFile,
		cb: (error: Error | null, acceptFile?: boolean) => void,
	): void;
	limits?: {
		fieldNameSize?: number;
		fieldSize?: number;
		fields?: number;
		fileSize?: number;
		files?: number;
		headerPairs?: number;
		parts?: number;
	};
	preservePath?: boolean;
	storage?: StorageEngine;
}

export interface MulterInstance {
	any(): RequestHandler;
	array(fieldName: string, maxCount?: number): RequestHandler;
	fields(
		fields: readonly { maxCount?: number; name: string }[],
	): RequestHandler;
	none(): RequestHandler;
	single(fieldName: string): RequestHandler;
}

export interface MulterStatic {
	(options?: MulterOptions): MulterInstance;
	MulterError: new (
		code: string,
		field?: string,
	) => Error & {
		code: string;
		field?: string;
	};
	diskStorage(options: DiskStorageOptions): StorageEngine;
	memoryStorage(): StorageEngine;
}

export interface StorageEngine {
	_handleFile(
		req: Request,
		file: MulterFile,
		callback: (error?: Error, info?: Partial<MulterFile>) => void,
	): void;
	_removeFile(
		req: Request,
		file: MulterFile,
		callback: (error: Error | null) => void,
	): void;
}

// Augmentation de Express.Request pour ajouter req.file
declare global {
	namespace Express {
		interface Request {
			file?: MulterFile;
			files?: MulterFile[] | { [fieldname: string]: MulterFile[] };
		}
	}
}
