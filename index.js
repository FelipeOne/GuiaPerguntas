const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const conexao = require("./database/database");
const Pergunta = require("./database/Pergunta");
const { raw } = require("body-parser");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({raw:true, order:[['id','DESC'] //ASC para ordem crescente"padrao"
]}).then(perguntas =>{ 
        console.log(perguntas);
        res.render("index", {
            perguntas:perguntas
        });
    });
    
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar")
});

app.post("/salvarPergunta",(req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        
        res.redirect("/");
    });
});

app.get("/perguntar/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id:id}
    }).then(perguntas =>{
        if(perguntas != undefined){
            Resposta.findAll({
                order:[['id','DESC']], //ASC para ordem crescente"padrao"
                where: {perguntaId:perguntas.id}
            }).then(respostas => {
                res.render("Pergunta",{ 
                    pergunta:perguntas,
                    resposta: respostas
                })
            })
        }else{
            res.redirect("/");
        }
    })

});
app.post("/responder",(req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.id;
    
    Resposta.create({
        campo: corpo,
        perguntaId: perguntaId 
    }).then(() => {
        
        res.redirect("/Perguntar/"+ perguntaId);
    });
});

app.listen(8080,() =>{
    console.log("App rodando");
});