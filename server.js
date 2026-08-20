const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "Backend NexaStock funcionando!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});