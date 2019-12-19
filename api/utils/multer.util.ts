import multer from 'multer';
import path from 'path';

const config = {
	filename: (req : Express.Request, file : Express.Multer.File, cb : Function) => { cb(null, `${Date.now()}${Math.random().toString()}${path.extname(file.originalname)}`); },
};

this.storage = multer.diskStorage(config);

const upload = multer({ storage: this.storage });

export default upload;
