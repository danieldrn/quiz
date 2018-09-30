'use strict';

module.exports = function (app) {

    const mongoose = require('mongoose');
    const Pergunta = mongoose.model('Pergunta');

    app.post('/Pergunta', function (req, res) {

        var data = req.body;


        try {
            var service = new app.services.perguntaService();
            var Tres = service.validarDados(data);

            if(!Tres.status){
                res.status(400).send({
                    message: Tres.message,
                    //data: 
                });
               
            }


        } catch (error) {
            console.log(error + Tres)
        }

        var pergunta = new Pergunta(data);

        pergunta.save()
            .then(x => {
                res.status(201).send({ message: 'Pergunta cadastrada com sucesso' });
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao persistir a pergunta',
                    data: e
                });
            });
    });

    app.get('/product', function (req, res) {

        Product.find({}, 'title price')
            .then(data => {
                res.status(201).send(data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Produto encontrado',
                    data: e
                });
            });
    });

    app.post('/product/obenhaProduto', function (req, res) {

        var data = req.body;

        Product.find({ title: data.title }, 'title price')
            .then(data => {
                res.status(201).send(data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Produto encontrado',
                    data: e
                });
            });
    });
}