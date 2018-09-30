'use strict';

module.exports = function(app) {

    const mongoose = require('mongoose');
    const Pergunta = mongoose.model('Pergunta');

    app.post('/pergunta', function(req, res) {

        var data = req.body;

        try {
            var servicePergunta = new app.services.perguntaService();
            var responseValidation = servicePergunta.validarDados(data);

            if (!responseValidation.status) {
                res.status(400).send({
                    message: responseValidation.message,
                });
            }


        } catch (error) {
            console.log(error + responseValidation)
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

    app.get('/pergunta', function(req, res) {

        Pergunta.find({}, 'pergunta respostas categoria')
            .then(data => {
                res.status(201).send(data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Pergunta não encontrada',
                    data: e
                });
            });
    });

    app.get('/pergunta/:id', function(req, res) {

        var param = req.params;

        Pergunta.findById(param.id, 'pergunta respostas categoria')
            .then(data => {
                res.status(201).send(data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Pergunta não encontrada',
                    data: e
                });
            });
    });

    app.get('/pergunta/:pergunta', function(req, res) {

        var data = req.body;

        Pergunta.find({ title: data.title }, 'pergunta respostas categoria')
            .then(data => {
                res.status(201).send(data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Pergunta não encontrada !',
                    data: e
                });
            });
    });

    app.put('/pergunta/:id', function(req, res) {

        var param = req.params;
        var data = req.body;

        Pergunta.findByIdAndUpdate(param.id, {
            $set: {
                pergunta: data.pergunta,
                respostas: data.respostas,
                categoria: data.categoria
            }
        })
            .then(data => {
                res.status(201).send('Pergunta atualizada com sucesso' + data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao atualizar o produto !',
                    data: e
                });
            });
    });

    app.delete('/pergunta/:id', function(req, res) {

        var param = req.params;
        var data = req.body;

        Pergunta.findByIdAndDelete(param.id, {
        })
            .then(data => {
                res.status(201).send('Pergunta removida com sucesso' + data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao remover a pergunta !',
                    data: e
                });
            });
    });
}