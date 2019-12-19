import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import upload from '../utils/multer.util';

class IndexRoutes {
	public router: Router = Router();
	public IndexController: IndexController;

	constructor() {
		this.IndexController = new IndexController();
		this.config();
	}

	config(): void{
		this.router.post('/calculateMultiples', this.IndexController.calculateMultiples);
		this.router.post('/uploadFile', upload.array('file',1), this.IndexController.uploadFile);
		this.router.post('/decryptKeywords', this.IndexController.decryptKeywords);
	}
}

export default new IndexRoutes().router;
