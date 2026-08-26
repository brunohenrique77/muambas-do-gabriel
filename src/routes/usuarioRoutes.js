const express = require('express');

const {
    criarUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    excluirUsuario
} = require('../controllers/usuarioController');

const router = express.Router();

router.post('/', criarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', excluirUsuario);

module.exports = router;