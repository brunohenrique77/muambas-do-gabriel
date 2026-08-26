const pool = require('../config/db');

async function criarFornecedor(req, res) {
    try {
        const {
            empresa_id,
            nome,
            cnpj,
            contato,
            email,
            status
        } = req.body;

        const resultado = await pool.query(
            `INSERT INTO fornecedores
            (empresa_id, nome, cnpj, contato, email, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                empresa_id,
                nome,
                cnpj,
                contato,
                email,
                status
            ]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO CADASTRAR FORNECEDOR:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar fornecedor',
            detalhe: erro.message
        });
    }
}

async function listarFornecedores(req, res) {
    try {
        const resultado = await pool.query(
            `SELECT *
             FROM fornecedores
             ORDER BY id`
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error('ERRO AO LISTAR FORNECEDORES:', erro);

        res.status(500).json({
            erro: 'Erro ao listar fornecedores',
            detalhe: erro.message
        });
    }
}

async function buscarFornecedor(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `SELECT *
             FROM fornecedores
             WHERE id = $1`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Fornecedor não encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO BUSCAR FORNECEDOR:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar fornecedor',
            detalhe: erro.message
        });
    }
}

async function atualizarFornecedor(req, res) {
    try {
        const { id } = req.params;

        const {
            empresa_id,
            nome,
            cnpj,
            contato,
            email,
            status
        } = req.body;

        const resultado = await pool.query(
            `UPDATE fornecedores
             SET empresa_id = $1,
                 nome = $2,
                 cnpj = $3,
                 contato = $4,
                 email = $5,
                 status = $6
             WHERE id = $7
             RETURNING *`,
            [
                empresa_id,
                nome,
                cnpj,
                contato,
                email,
                status,
                id
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Fornecedor não encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR FORNECEDOR:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar fornecedor',
            detalhe: erro.message
        });
    }
}

async function excluirFornecedor(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `DELETE FROM fornecedores
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Fornecedor não encontrado'
            });
        }

        res.json({
            mensagem: 'Fornecedor excluído com sucesso',
            fornecedor: resultado.rows[0]
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR FORNECEDOR:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir fornecedor',
            detalhe: erro.message
        });
    }
}

module.exports = {
    criarFornecedor,
    listarFornecedores,
    buscarFornecedor,
    atualizarFornecedor,
    excluirFornecedor
};