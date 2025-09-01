import fs from "fs";
import path from "path";
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
        const imagem = req.file ? `${req.file.filename}` : null;

        EstoqueModel.criar({ nome_produto, preco, imagem, quantidade }, (err, results) => {
            if (err) {
                console.error("Erro ao inserir produto:", err);
                return res.status(500).send("Erro ao criar produto");
            }
            res.status(201).json({ id: results.insertId, nome_produto, preco, imagem, quantidade });
        });
    }

    static atualizar(req, res) {
    const { id } = req.params;

    EstoqueModel.buscarPorId(id, (err, produto) => {
        if (err) return res.status(500).send("Erro ao buscar produto");
        if (!produto) return res.status(404).send("Produto não encontrado");

        let novaImagem = produto.imagem; 
        if (req.file) {
            novaImagem = req.file.filename;
        } else if (req.body.imagem) {
            novaImagem = req.body.imagem; 
        }

        const updatedFields = {};
        if (req.body.nome_produto) updatedFields.nome_produto = req.body.nome_produto;
        if (req.body.preco) updatedFields.preco = req.body.preco;
        if (req.body.quantidade) updatedFields.quantidade = req.body.quantidade;
        updatedFields.imagem = novaImagem;

        if (req.file && produto.imagem) {
            const oldImagePath = path.join(publicPath, produto.imagem);
            if (fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error("Erro ao excluir imagem antiga:", err);
                    else console.log("Imagem antiga removida:", oldImagePath);
                });
            }
        }

        EstoqueModel.atualizar(id, updatedFields, (err) => {
            if (err) return res.status(500).send("Erro ao atualizar produto");
            res.json({ message: "Produto atualizado com sucesso" });
        });
    });
}


    static deletar(req, res) {
        const { id } = req.params;

        EstoqueModel.buscarPorId(id, (err, produto) => {
            if (err) return res.status(500).send("Erro ao buscar produto");
            if (!produto) return res.status(404).send("Produto não encontrado");

            if (produto.imagem) {
                const imagePath = path.resolve("public", produto.imagem);
                if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, (err) => {
                        if (err) console.error("Erro ao excluir imagem:", err);
                    });
                }
            }

            EstoqueModel.deletar(id, (err) => {
                if (err) return res.status(500).send("Erro ao deletar produto");
                res.json({ message: "Produto deletado com sucesso" });
            });
        });
    }
}

export default EstoqueController;