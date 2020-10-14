const database = require("../../config/database/database");

const ContatoDAO = require("../../config/DAO/ContatoDAO");
const { request } = require("express");
const contatoDAO = new ContatoDAO(database);

class ContatoController {
  static getAllContacts() {
    return (request, response) => {
      contatoDAO
        .findAll()
        .then((rows) => {
          return response.send(rows);
        })
        .catch((error) => console.log(error));
    };
  }

  static findContact() {
    return (request, response) => {
      const {
        params: { id: contatoId },
      } = request;
      contatoDAO
        .findOne([contatoId])
        .then((row) => {
          return response.send([row]);
        })
        .catch((error) => console.log(error));
    };
  }

  static createContact() {
    return (request, response) => {
      const errors = [];
      if (!request.body.primeiro_nome) {
        errors.push("Primeiro nome não informado");
      }

      if (!request.body.email) {
        errors.push("E-mail não informado");
      }

      if (errors.length) {
        response.status(400).json({ error: errors.join(",") });
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
      } = request;
      contatoDAO
        .create([
          primeiro_nome,
          ultimo_nome,
          telefone,
          tipo_telefone,
          email,
          endereco,
          github,
          linkedin,
          pix,
        ])
        .then((result) => {
          return response.send(result);
        })
        .catch((error) => response.send(error));
    };
  }

  static removeContact() {
    return (request, response) => {
      const {
        params: { id: contatoId },
      } = request;
      contatoDAO
        .delete([contatoId])
        .then(() => {
          return response.send("Registro removido");
        })
        .catch((error) => console.log(error));
    };
  }

  static updateContact() {
    return (request, response) => {
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
      } = request;
      const { id } = request.params;

      const contact = [
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
      contatoDAO
        .update(contact)
        .then((result) => response.send(result))
        .catch((error) => console.log(error));
    };
  }
}

module.exports = ContatoController;
