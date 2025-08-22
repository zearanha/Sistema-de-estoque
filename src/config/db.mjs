import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Adicione esta linha para ver o valor da variável de ambiente
console.log('Valor da variável DB_DATABASE:', process.env.DB_DATABASE);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

export default connection;