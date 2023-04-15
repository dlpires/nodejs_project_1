const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/pergunta");
const Resposta = require("./database/Resposta");

//DATABASE
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//ESTOU DIZENDO PARA DIZER QUE O EXPRESS TERÁ O RENDERIZADOR EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

//BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/////ROTAS
//HOMEPAGE
app.get("/",(req,res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
});

//PERGUNTA
app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

//RECEBENDO DADOS DO FORMULARIO
app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //INSERINDO DADOS NO BANCO DE DADOS
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        //DEPOIS REDIRECIONA PARA A HOMEPAGE, CASO CONSIGA INSERIR
        res.redirect("/");
    });
});

//MOSTRAR PERGUNTA
app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //Pergunta encontrada
            //pegar as respostas do banco
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }
        else{ //Pergunta não encontrada
            res.redirect("/")
        }
    });
});

//RESPONDER PERGUNTA
app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    //INSERINDO DADOS NO BANCO DE DADOS
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        //DEPOIS REDIRECIONA PARA A PÁGINA DA PERGUNTA, CASO CONSIGA INSERIR
        res.redirect("/pergunta/"+perguntaId);
    });
});

//RUN SERVICE IN 8080 PORT
app.listen(8080,()=>{
    console.log("App rodando!")
});