const pool = require('../config/db');

// CREATE
async function criarMovimentacao(req, res) {
    try {
        const {
            empresa_id,
            estoque_id,
            tipo,
            descricao,
            data,
            quantidade,
            usuario_id
        } = req.body;

        const resultado = await pool.query(
            `INSERT INTO movimentacao
            (empresa_id, estoque_id, tipo, descricao, data, quantidade, usuario_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                empresa_id,
                estoque_id,
                tipo,
                descricao,
                data,
                quantidade,
                usuario_id
            ]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO CADASTRAR MOVIMENTAÇÃO:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar movimentação',
            detalhe: erro.message
        });
    }
}

// READ - todas
async function listarMovimentacoes(req, res) {
    try {
        const resultado = await pool.query(
            `SELECT *
             FROM movimentacao
             ORDER BY id`
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error('ERRO AO LISTAR MOVIMENTAÇÕES:', erro);

        res.status(500).json({
            erro: 'Erro ao listar movimentações',
            detalhe: erro.message
        });
    }
}

// READ - uma
async function buscarMovimentacao(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `SELECT *
             FROM movimentacao
             WHERE id = $1`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO BUSCAR MOVIMENTAÇÃO:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar movimentação',
            detalhe: erro.message
        });
    }
}

// UPDATE
async function atualizarMovimentacao(req, res) {
    try {
        const { id } = req.params;

        const {
            empresa_id,
            estoque_id,
            tipo,
            descricao,
            data,
            quantidade,
            usuario_id
        } = req.body;

        const resultado = await pool.query(
            `UPDATE movimentacao
             SET empresa_id = $1,
                 estoque_id = $2,
                 tipo = $3,
                 descricao = $4,
                 data = $5,
                 quantidade = $6,
                 usuario_id = $7
             WHERE id = $8
             RETURNING *`,
            [
                empresa_id,
                estoque_id,
                tipo,
                descricao,
                data,
                quantidade,
                usuario_id,
                id
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR MOVIMENTAÇÃO:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar movimentação',
            detalhe: erro.message
        });
    }
}

// DELETE
async function excluirMovimentacao(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `DELETE FROM movimentacao
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        res.json({
            mensagem: 'Movimentação excluída com sucesso',
            movimentacao: resultado.rows[0]
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR MOVIMENTAÇÃO:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir movimentação',
            detalhe: erro.message
        });
    }
}

module.exports = {
    criarMovimentacao,
    listarMovimentacoes,
    buscarMovimentacao,
    atualizarMovimentacao,
    excluirMovimentacao
};