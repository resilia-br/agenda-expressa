class ContatoDAO {
  constructor(database) {
    this._database = database;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM contatos";
      this._database.all(query, (error, result) => {
        if (error)
          return reject("Não foi possivel recuperar os dados da tabela");
        return resolve(result);
      });
    });
  }

  findOne(contatoId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM contatos WHERE id = ?";
      this._database.get(query, contatoId, (error, result) => {
        if (error) reject("Não foi possível recuperar o contato");
        return resolve(result);
      });
    });
  }

  create(contato) {
    return new Promise((resolve, reject) => {
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
      this._database.run(query, contato, (error, result) => {
        if (error) return reject(`Não foi possível adicionar o contato`);
        resolve({ message: "success" });
      });
    });
  }

  update(contato) {
    return new Promise((resolve, reject) => {
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
      this._database.run(query, contato, (error, result) => {
        if (error) return reject("Não foi possível atualizar o contato");
        resolve({ message: "recurso atualizado com sucesso" });
      });
    });
  }

  delete(contatoId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM contatos WHERE id = ?";
      this._database.run(query, contatoId, (error, result) => {
        if (error) reject("Não foi possível apagar o registro");
        return resolve(result);
      });
    });
  }
}

module.exports = ContatoDAO;
