const express = require('express');

const {
    criarEstoque,
    listarEstoques,
    buscarEstoque,
    atualizarEstoque,
    excluirEstoque
} = require('../controllers/estoqueController');

const router = express.Router();

router.post('/', criarEstoque);
router.get('/', listarEstoques);
router.get('/:id', buscarEstoque);
router.put('/:id', atualizarEstoque);
router.delete('/:id', excluirEstoque);

module.exports = router;