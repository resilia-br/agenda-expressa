const express = require("express");
const database = require("./config/database");

const app = express();
const PORT = 3000;

// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.listen(PORT, () => console.log("Servidor inicializado!"));

app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

/**
 * Buscar todos os contatos na minha base
 */
app.get("/api/contatos", (req, res) => {});

/**
 * Buscar um contato específico na minha base (usando o id)
 * @id Inteiro Identifica um usuário
 */
app.get("/api/contatos/:id", (req, res) => {});

/**
 * Criar um novo contato
 */
app.post("/api/contatos", (req, res) => {});

/**
 * Deletar um contato
 */
app.delete("/api/contatos/:id", (req, res) => {});

module.exports = { app };
