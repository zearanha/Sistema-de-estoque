import express from 'express';
import multer from 'multer';
import EstoqueController from '../controllers/EstoqueController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage});

router.get('/', EstoqueController.listar);
router.post('/', upload.single("imagem"), EstoqueController.criar);
router.put('/:id', upload.single("imagem"), EstoqueController.atualizar);
router.delete('/:id', EstoqueController.deletar);

export default router;