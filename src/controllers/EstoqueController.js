import EstoqueModel from "../models/estoqueModel.js";

class EstoqueController {
    static listar(req, res) {
        EstoqueModel.listar((err, results) => {
            if (err) return res.status(500).send("Erro ao buscar produtos");
            res.status(200).json({ produtos: results });
        });
    }

    static criar(req, res) {
        const { nome_produto, preco, quantidade } = req.body;
        const imagem = req.file ? `/public/${req.file.filename}` : null;
        console.log('Dados recebidos para inserção:', { nome_produto, preco, imagem, quantidade });

        EstoqueModel.criar({ nome_produto, preco, imagem, quantidade }, (err, results) => {
            if (err) {
                console.error('Erro ao inserir produto:', err);
                return res.status(500).send("Erro ao criar produto");
            }
            res.status(201).json({ id: results.insertId, nome_produto, preco, imagem, quantidade });
        });
    }

    static atualizar(req, res) {
        const { id } = req.params;
        const { nome_produto, preco, quantidade } = req.body;
        const imagem = req.file ? `/public/${req.file.filename}` : req.body.imagem;

        EstoqueModel.atualizar(id, { nome_produto, preco, imagem, quantidade }, (err, results) => {
            if (err) return res.status(500).send("Erro ao atualizar produto");
            res.json({ message: "Produto atualizado com sucesso" })
        });
    }

    static deletar(req, res) {
        const { id } = req.params;

        EstoqueModel.deletar(id, (err, results) => {
            if (err) return res.status(500).send("Erro ao deletar produto");
            res.json({ message: "Produto deletado com sucesso" });
        });
    }
}

export default EstoqueController;