const pool = require('../config/db');

// CREATE
async function criarEstoque(req, res) {
    try {
        const {
            empresa_id,
            produto,
            categoria,
            quantidade,
            valor,
            status
        } = req.body;

        const resultado = await pool.query(
            `INSERT INTO estoque
            (empresa_id, produto, categoria, quantidade, valor, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                empresa_id,
                produto,
                categoria,
                quantidade,
                valor,
                status
            ]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO CADASTRAR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar produto no estoque',
            detalhe: erro.message
        });
    }
}

// READ - todos
async function listarEstoques(req, res) {
    try {
        const resultado = await pool.query(
            `SELECT *
             FROM estoque
             ORDER BY id`
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error('ERRO AO LISTAR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao listar estoque',
            detalhe: erro.message
        });
    }
}

// READ - um
async function buscarEstoque(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `SELECT *
             FROM estoque
             WHERE id = $1`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Produto não encontrado no estoque'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO BUSCAR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar produto',
            detalhe: erro.message
        });
    }
}

// UPDATE
async function atualizarEstoque(req, res) {
    try {
        const { id } = req.params;

        const {
            empresa_id,
            produto,
            categoria,
            quantidade,
            valor,
            status
        } = req.body;

        const resultado = await pool.query(
            `UPDATE estoque
             SET empresa_id = $1,
                 produto = $2,
                 categoria = $3,
                 quantidade = $4,
                 valor = $5,
                 status = $6
             WHERE id = $7
             RETURNING *`,
            [
                empresa_id,
                produto,
                categoria,
                quantidade,
                valor,
                status,
                id
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Produto não encontrado no estoque'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar estoque',
            detalhe: erro.message
        });
    }
}

// DELETE
async function excluirEstoque(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `DELETE FROM estoque
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Produto não encontrado no estoque'
            });
        }

        res.json({
            mensagem: 'Produto removido do estoque com sucesso',
            estoque: resultado.rows[0]
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir produto do estoque',
            detalhe: erro.message
        });
    }
}

module.exports = {
    criarEstoque,
    listarEstoques,
    buscarEstoque,
    atualizarEstoque,
    excluirEstoque
};