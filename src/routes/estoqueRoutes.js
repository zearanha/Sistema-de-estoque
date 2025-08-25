import express from 'express';
import upload from '../config/multer.js';
import EstoqueController from '../controllers/EstoqueController.js';

const router = express.Router();



router.get('/produtos', EstoqueController.listar);
router.post('/produtos', upload.single("imagem"), EstoqueController.criar);
router.put('/produtos/:id', upload.single("imagem"), EstoqueController.atualizar);
router.delete('/produtos/:id', EstoqueController.deletar);

export default router;