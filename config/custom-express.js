var express = require('express');
var consign = require('consign');
var bodyParse = require('body-parser');
var Pergunta = require('../models/perguntas');
var Categoria = require('../models/categoria');
var Usuario = require('../models/usuario');

module.exports = function(){
    
    var app = express();
    
    app.use(bodyParse.urlencoded({ extended: false }));
    app.use(bodyParse.json());
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:8100");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('ACONTECEU UM ERRO \r\nDETALHES DO ERRO \r\n' + err.stack);
    });
  
    consign()
        .include('controllers')
        .then('persistencia')
        .then('services')
        .into(app);

    return app;
}