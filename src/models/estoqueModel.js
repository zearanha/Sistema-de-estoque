import connection from "../config/db";

class EstoqueModel {
    static listar(callback){
        connection.query("SELECT * FROM produtos", callback);
    }

    static criar(dados, callback){
        connection.query("INSERT INTO produtos (nome_produto, preco, imagem) VALUES (?, ?, ?)", 
        [dados.nome_produto, dados.preco, dados.imagem], callback
        );
    }

    static atualizar(id, dados, callback){
        connection.query("UPDATE produtos SET nome_produto = ?, preco = ?, imagem = ? WHERE id = ?", 
        [dados.nome_produto, dados.preco, dados.imagem, id], callback
        );
    }

    static deletar(id, callback){
        connection.query("DELETE FROM produtos WHERE id = ?", [id], callback);
    }
}

export default EstoqueModel;