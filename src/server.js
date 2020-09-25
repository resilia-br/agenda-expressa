const express = require("express");
const database = require("./config/database");

const app = express();
const PORT = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log("Servidor inicializado!"));

app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

/**
 * Buscar todos os contatos na minha base
 */
app.get("/api/contatos", (req, res) => {
  const query = "SELECT * FROM contatos";
  const params = [];
  database.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

/**
 * Buscar um contato específico na minha base (usando o id)
 * @id Inteiro Identifica um usuário
 */
app.get("/api/contatos/:id", (req, res) => {
  const query = "SELECT * FROM contatos WHERE id = ?";
  const {
    params: { id },
  } = req;
  database.get(query, [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

/**
 * Criar um novo contato
 */
app.post("/api/contatos", (req, res) => {
  const errors = [];
  if (!req.body.primeiro_nome) {
    errors.push("Primeiro nome não informado");
  }

  if (!req.body.email) {
    errors.push("E-mail não informado");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }

  const {
    body: {
      primeiro_nome,
      ultimo_nome,
      telefone,
      tipo_telefone,
      email,
      endereco,
      github,
      linkedin,
      pix,
    },
  } = req;

  const query = `INSERT INTO contatos (
    primeiro_nome,
    ultimo_nome,
    telefone,
    tipo_telefone,
    email,
    endereco,
    github,
    linkedin,
    pix
  ) VALUES (?,?,?,?,?,?,?,?,?)`;

  const params = [
    primeiro_nome,
    ultimo_nome,
    telefone,
    tipo_telefone,
    email,
    endereco,
    github,
    linkedin,
    pix,
  ];

  database.run(query, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.json({
      message: "success",
      data: params,
      id: this.lastID,
    });
  });
});

/**
 * Atualizar um contato existente
 */
app.put("/api/contatos/:id", (req, res) => {
  const {
    body: {
      primeiro_nome,
      ultimo_nome,
      telefone,
      tipo_telefone,
      email,
      endereco,
      github,
      linkedin,
      pix,
    },
  } = req;
  const { id } = req.params;

  const query = `UPDATE contatos SET
    primeiro_nome = COALESCE(?, primeiro_nome),
    ultimo_nome = COALESCE(?, ultimo_nome),
    telefone = COALESCE(?, telefone),
    tipo_telefone = COALESCE(?, tipo_telefone),
    email = COALESCE(?, email),
    endereco = COALESCE(?, endereco),
    github = COALESCE(?, github),
    linkedin = COALESCE(?, linkedin),
    pix = COALESCE(?, pix)
    WHERE id = ?
  `;

  const params = [
    primeiro_nome,
    ultimo_nome,
    telefone,
    tipo_telefone,
    email,
    endereco,
    github,
    linkedin,
    pix,
    id,
  ];

  database.run(query, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.json({
      message: "success",
      data: { updated_rows: this.changes },
    });
  });
});

/**
 * Deletar um contato
 */
app.delete("/api/contatos/:id", (req, res) => {
  const query = "DELETE FROM contatos WHERE id = ?";
  const params = [req.params.id];

  database.run(query, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    console.log(result);
    res.json({
      message: "success",
    });
  });
});

module.exports = { app };
