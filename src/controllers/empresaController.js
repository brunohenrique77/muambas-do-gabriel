const pool = require('../config/db');

async function criarEmpresa(req, res) {
    try {
        const { nome, cnpj, senha } = req.body;

        const resultado = await pool.query(
            `INSERT INTO empresa (nome, cnpj, senha)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, cnpj, senha]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO CADASTRAR EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar empresa',
            detalhe: erro.message
        });
    }
}

async function listarEmpresas(req, res) {
    try {
        const resultado = await pool.query(
            'SELECT * FROM empresa ORDER BY empresa_id'
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error('ERRO AO LISTAR EMPRESAS:', erro);

        res.status(500).json({
            erro: 'Erro ao listar empresas',
            detalhe: erro.message
        });
    }
}

async function buscarEmpresa(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'SELECT * FROM empresa WHERE empresa_id = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Empresa não encontrada'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO BUSCAR EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar empresa',
            detalhe: erro.message
        });
    }
}

async function atualizarEmpresa(req, res) {
    try {
        const { id } = req.params;
        const { nome, cnpj, senha } = req.body;

        const resultado = await pool.query(
            `UPDATE empresa
             SET nome = $1,
                 cnpj = $2,
                 senha = $3
             WHERE empresa_id = $4
             RETURNING *`,
            [nome, cnpj, senha, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Empresa não encontrada'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar empresa',
            detalhe: erro.message
        });
    }
}

async function excluirEmpresa(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'DELETE FROM empresa WHERE empresa_id = $1 RETURNING *',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Empresa não encontrada'
            });
        }

        res.json({
            mensagem: 'Empresa excluída com sucesso',
            empresa: resultado.rows[0]
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir empresa',
            detalhe: erro.message
        });
    }
}

module.exports = {
    criarEmpresa,
    listarEmpresas,
    buscarEmpresa,
    atualizarEmpresa,
    excluirEmpresa
};