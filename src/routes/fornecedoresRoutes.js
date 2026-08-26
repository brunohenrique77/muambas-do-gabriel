const express = require('express');

const {
    criarFornecedor,
    listarFornecedores,
    buscarFornecedor,
    atualizarFornecedor,
    excluirFornecedor
} = require('../controllers/fornecedoresController');

const router = express.Router();

router.post('/', criarFornecedor);
router.get('/', listarFornecedores);
router.get('/:id', buscarFornecedor);
router.put('/:id', atualizarFornecedor);
router.delete('/:id', excluirFornecedor);

module.exports = router;