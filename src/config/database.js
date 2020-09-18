const sqlite = require("sqlite3").verbose();
const DB_SOURCE = "src/config/database/database.sqlite";

const CONTACTS = `
  CREATE TABLE IF NOT EXISTS contatos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    primeiro_nome TEXT,
    ultimo_nome TEXT,
    telefone TEXT,
    tipo_telefone TEXT,
    email TEXT,
    endereco TEXT,
    github TEXT,
    linkedin TEXT,
    pix TEXT,
    CONSTRAINT email_unique UNIQUE(email)
  );
`;

const database = new sqlite.Database(DB_SOURCE, (err) => {
  if (err) {
    console.log(err);
  }
  database.run(CONTACTS, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = database;
