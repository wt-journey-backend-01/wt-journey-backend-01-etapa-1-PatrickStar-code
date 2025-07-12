const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

let ultimoContato = null;

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/sugestao", (req, res) => {
  nome = req.query.nome;
  ingredientes = req.query.ingredientes;

  const html = `
  <html>
    <head>
      <title>Sugestão de Lanche</title>
      <link rel="stylesheet" href="css/style.css" />
    </head>

    <body>
      <h1>Sugestão de Lanche</h1>
      <h2>Recebemos a seguinte sugestão de lanche:</h2>
      <section class="menu">
      <div class="card" >
      <p>Nome: ${nome}</p>
      <p>Ingredientes: ${ingredientes}</p>
      </div>
      </section>
    </body>
  </html>
  `;
  res.status(200).send(html);
});

app.get("/contato", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/views/contato.html"));
});
("");

app.post("/contato", (req, res) => {
  ultimoContato = req.body;
  res.redirect("/contato-recebido");
});

app.get("/contato-recebido", (req, res) => {
  if (ultimoContato) {
    const html = `
    <html>
      <head>
        <title>Contato Recebido</title>
        <link rel="stylesheet" href="css/style.css" />
      </head>
      <body>
        <h1>Contato Recebido</h1>
        <p>Nome: ${ultimoContato.nome}</p>
        <p>E-mail: ${ultimoContato.email}</p>
        <p>Assunto: ${ultimoContato.assunto}</p>
        <p>Mensagem: ${ultimoContato.mensagem}</p>
      </body>
    </html>
    `;
    res.status(200).send(html);
  } else {
    redirect("/404");
  }
});

app.get("/api/lanches", function (req, res) {
  const data = fs.readFileSync(
    path.join(__dirname, "public/data/lanches.json")
  );
  res.status(200).json(JSON.parse(data));
});

app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
