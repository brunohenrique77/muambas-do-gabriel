const pool = require('../config/db');

async function criarUsuario(req, res) {
    try {
        const { empresa_id, nome, senha } = req.body;

        const resultado = await pool.query(
            `INSERT INTO usuarios (empresa_id, nome, senha)
             VALUES ($1, $2, $3)
             RETURNING id, empresa_id, nome`,
            [empresa_id, nome, senha]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO CADASTRAR USUARIO:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar usuário',
            detalhe: erro.message
        });
    }
}

async function listarUsuarios(req, res) {
    try {
        const resultado = await pool.query(
            `SELECT id, empresa_id, nome
             FROM usuarios
             ORDER BY id`
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error('ERRO AO LISTAR USUARIOS:', erro);

        res.status(500).json({
            erro: 'Erro ao listar usuários',
            detalhe: erro.message
        });
    }
}

async function buscarUsuario(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `SELECT id, empresa_id, nome
             FROM usuarios
             WHERE id = $1`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO BUSCAR USUARIO:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar usuário',
            detalhe: erro.message
        });
    }
}

async function atualizarUsuario(req, res) {
    try {
        const { id } = req.params;
        const { empresa_id, nome, senha } = req.body;

        const resultado = await pool.query(
            `UPDATE usuarios
             SET empresa_id = $1,
                 nome = $2,
                 senha = $3
             WHERE id = $4
             RETURNING id, empresa_id, nome`,
            [empresa_id, nome, senha, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR USUARIO:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar usuário',
            detalhe: erro.message
        });
    }
}

async function excluirUsuario(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `DELETE FROM usuarios
             WHERE id = $1
             RETURNING id, empresa_id, nome`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        res.json({
            mensagem: 'Usuário excluído com sucesso',
            usuario: resultado.rows[0]
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR USUARIO:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir usuário',
            detalhe: erro.message
        });
    }
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    excluirUsuario
};