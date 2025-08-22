import express from 'express';
import upload from '../config/multer.js';
import EstoqueController from '../controllers/EstoqueController.js';

const router = express.Router();



router.get('/', EstoqueController.listar);
router.post('/', upload.single("imagem"), EstoqueController.criar);
router.put('/:id', upload.single("imagem"), EstoqueController.atualizar);
router.delete('/:id', EstoqueController.deletar);

export default router;