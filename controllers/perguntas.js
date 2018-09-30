'use strict';

module.exports = function (app) {

    const mongoose = require('mongoose');
    const Pergunta = mongoose.model('Pergunta');

    app.post('/pergunta', function (req, res) {

        var data = req.body;

        if (ehVetorDePergunta(data)) {
            data.forEach(element => {
                valideEstadoDosObjetos(app, element, res);
                var pergunta = new Pergunta(data);
                persistaPerguntas(pergunta, element, res);
            });

        } else {
            valideEstadoDosObjetos(data, res);
            persistaPerguntas(data, res);
        }

    });

    app.get('/pergunta', function (req, res) {

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

    app.get('/pergunta/:id', function (req, res) {

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

    app.get('/pergunta/:pergunta', function (req, res) {

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

    app.put('/pergunta/:id', function (req, res) {

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

    app.delete('/pergunta/:id', function (req, res) {

        var param = req.params;

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

    app.delete('/pergunta/desativar/:id', function (req, res) {

        var param = req.params;

        Pergunta.findByIdAndUpdate(param.id, {
            $set: {
                estaAtiva: false
            }
        })
            .then(data => {
                res.status(201).send('Pergunta desativada com sucesso' + data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao desativar a pergunta !',
                    data: e
                });
            });
    });
}

function ehVetorDePergunta(data) {
    if (data.length > 1) {
        return true;
    } else {
        return false;
    }
}

function persistaPerguntas(pergunta, data, res, ehVetor) {

    var mongoose = require('mongoose');
    const Pergunta = mongoose.model('Pergunta');
    pergunta = new Pergunta(data);

    if (!ehVetor) {
        pergunta.save()
            .then(x => {
                res.status(201).send({ message: 'Pergunta cadastrada com sucesso' });
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao persistir a pergunta',
                    data: e
                });
            });
    } else {

        try {
            pergunta.save();
        } catch (error) {
            res.status(400).send({
                message: 'Falha ao persistir a pergunta',
                data: error
            });
        }
        
        res.status(201).send({ message: 'Pergunta cadastrada com sucesso' });
    }
}

function valideEstadoDosObjetos(app, data, res) {

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
}