const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
      <a href="/">Voltar para a página inicial</a>

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
  const contato = req.body;
  const html = `
    <html>
      <head>
        <title>Contato Recebido</title>
        <link rel="stylesheet" href="css/style.css" />
      </head>
      <body>
        <h1>Contato Recebido</h1>
                    <section class="menu">

                    <div class="card">

        <p>Nome: ${contato.nome}</p>
        <p>E-mail: ${contato.email}</p>
        <p>Assunto: ${contato.assunto}</p>
        <p>Mensagem: ${contato.mensagem}</p>
        </div>
                </section>

        <a href="/">Voltar para a página inicial</a>
      </body>
    </html>
    `;
  res.status(200).send(html);
});

app.get("/api/lanches", function (req, res) {
  const data = fs.readFileSync(
    path.join(__dirname, "public/data/lanches.json")
  );
  res.status(200).json(JSON.parse(data));
});

app.get("/404", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});

app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
