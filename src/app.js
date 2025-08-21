import express from 'express';
import estoqueRoutes from './routes/estoqueRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
var port = process.env.PORT;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/estoque', estoqueRoutes);
app.use("/uploads", express.static("src/uploads"));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export default app;