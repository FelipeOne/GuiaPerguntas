const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const conexao = require("./database/database")

conexao
    .authenticate()
    .then(() => { 
        console.log("conexao com banco de dados")
    })
    .catch((msgError) => {
        console.log(msgError)
    });

//bodyparser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//essa linha e para fazer o node utillizar o ejs
app.set("view engine","ejs");
app.use(express.static("public"));

//rotas
app.get("/",(req, res) =>{
    res.render("index")
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar")
});

app.post("/salvarPergunta",(req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("formulario Preenchido" + titulo);
});

app.listen(8080,() =>{
    console.log("App rodando");
});