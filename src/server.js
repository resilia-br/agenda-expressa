const express = require("express");
const bodyParser = require("body-parser");
const contatosRouter = require("./routes/contatosRouter");

const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log("Servidor inicializado!"));

app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

contatosRouter(app);

module.exports = { app };
