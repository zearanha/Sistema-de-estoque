import connection from "../config/db.mjs";

class EstoqueModel {
    static listar(callback) {
        connection.query("SELECT * FROM produtos", callback);
    }

    static buscarPorId(id, callback) {
        connection.query("SELECT * FROM produtos WHERE id = ?", [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]);
        });
    }

    static criar(dados, callback) {
        connection.query("INSERT INTO produtos (nome_produto, preco, imagem, quantidade) VALUES (?, ?, ?, ?)",
            [dados.nome_produto, dados.preco, dados.imagem, dados.quantidade || 0], callback
        );
    }

    static atualizar(id, dados, callback) {
        connection.query("UPDATE produtos SET nome_produto = ?, preco = ?, imagem = ?, quantidade = ? WHERE id = ?",
            [dados.nome_produto, dados.preco, dados.imagem, dados.quantidade, id], callback
        );
    }

    static deletar(id, callback) {
        connection.query("DELETE FROM produtos WHERE id = ?", [id], callback);
    }
}

export default EstoqueModel;