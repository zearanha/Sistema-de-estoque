import express from 'express';
import estoqueRoutes from './routes/estoqueRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
var port = process.env.PORT;

dotenv.config();

app.use(cors());

app.use('/estoque', estoqueRoutes);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(__dirname + "/src/uploads"));


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export default app;