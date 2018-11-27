var express = require('express');
var consign = require('consign');
var bodyParse = require('body-parser');
var Product = require('../models/product');
var Pergunta = require('../models/perguntas');
var Categoria = require('../models/categoria');
var Usuario = require('../models/usuario');

module.exports = function(){
    
    var app = express();
    
    app.use(bodyParse.urlencoded({ extended: false }));
    app.use(bodyParse.json());
    
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