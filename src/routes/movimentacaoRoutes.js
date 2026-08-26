const express = require('express');

const {
    criarMovimentacao,
    listarMovimentacoes,
    buscarMovimentacao,
    atualizarMovimentacao,
    excluirMovimentacao
} = require('../controllers/movimentacaoController');

const router = express.Router();

router.post('/', criarMovimentacao);
router.get('/', listarMovimentacoes);
router.get('/:id', buscarMovimentacao);
router.put('/:id', atualizarMovimentacao);
router.delete('/:id', excluirMovimentacao);

module.exports = router;