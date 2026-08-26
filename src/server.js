const express = require('express');
const cors = require('cors');

const empresaRoutes = require('./routes/empresaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const fornecedorRoutes = require('./routes/fornecedoresRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/empresa', empresaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/fornecedores', fornecedorRoutes);
app.use('/movimentacao', movimentacaoRoutes);
app.use('/estoque', estoqueRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
