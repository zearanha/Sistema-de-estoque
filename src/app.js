import express from 'express';
import estoqueRoutes from './routes/estoqueRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { join } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
var port = process.env.PORT;
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config();

app.use(cors());

app.use('/estoque', estoqueRoutes);

app.use('/public', express.static(join(dirname, '..', 'public')));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export default app;