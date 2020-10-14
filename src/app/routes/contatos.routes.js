const contatoController = require("../controllers/contatoController");

const {
  getAllContacts,
  findContact,
  createContact,
  updateContact,
  removeContact,
} = contatoController;

module.exports = (app) => {
  app.get("/api/v1/contatos", getAllContacts());
  app.get("/api/v1/contatos/:id", findContact());
  app.post("/api/v1/contatos", createContact());
  app.put("/api/v1/contatos/:id", updateContact());
  app.delete("/api/v1/contatos/:id", removeContact());
};
