const pool = require("../db");

const criarUsuario = async (req, res) => {
    try {
        const { empresa_id, nome, email, senha } = req.body;

        if (!empresa_id || !nome || !email || !senha) {
            return res.status(400).json({
                erro: "Todos os campos são obrigatórios"
            });
        }

        const usuarioExistente = await pool.query(
            "SELECT id FROM usuarios WHERE email = $1 AND empresa_id = $2",
            [email, empresa_id]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(409).json({
                erro: "Este email já está cadastrado para esta empresa"
            });
        }

        const resultado = await pool.query(
            `INSERT INTO usuarios
            (empresa_id, nome, email, senha)
            VALUES ($1, $2, $3, $4)
            RETURNING id, empresa_id, nome, email, criado_em`,
            [empresa_id, nome, email, senha]
        );

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            usuario: resultado.rows[0]
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar usuário"
        });
    }
};

module.exports = {
    criarUsuario
};