type MulterMiddleware = (
	_req: unknown,
	_res: unknown,
	next: () => void,
) => void;

type MulterInstance = {
	single: () => MulterMiddleware;
	array: () => MulterMiddleware;
};

const multer = (): MulterInstance => ({
	single: () => (_req, _res, next) => next(),
	array: () => (_req, _res, next) => next(),
});

multer.memoryStorage = () => ({});
multer.diskStorage = () => ({});

export default multer;
