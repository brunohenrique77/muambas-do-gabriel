const express = require("express");
const pool = require("../config/database");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const { empresa_id, nome, email, senha } = req.body;

        const resultado = await pool.query(
            `INSERT INTO usuarios 
            (empresa_id, nome, email, senha)
            VALUES ($1, $2, $3, $4)
            RETURNING id, empresa_id, nome, email`,
            [empresa_id, nome, email, senha]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao cadastrar usuário"
        });
    }
});


router.get("/", async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT id, empresa_id, nome, email, criado_em
             FROM usuarios
             ORDER BY id`
        );

        res.status(200).json(resultado.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar usuários"
        });
    }
});



router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `SELECT id, empresa_id, nome, email, criado_em
             FROM usuarios
             WHERE id = $1`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar usuário"
        });
    }
});



router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { empresa_id, nome, email, senha } = req.body;

        const resultado = await pool.query(
            `UPDATE usuarios
             SET empresa_id = $1,
                 nome = $2,
                 email = $3,
                 senha = $4
             WHERE id = $5
             RETURNING id, empresa_id, nome, email, criado_em`,
            [empresa_id, nome, email, senha, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao atualizar usuário"
        });
    }
});



router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `DELETE FROM usuarios
             WHERE id = $1
             RETURNING id, empresa_id, nome, email`,
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Usuário excluído com sucesso",
            usuario: resultado.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao excluir usuário"
        });
    }
});


module.exports = router;