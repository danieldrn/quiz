'use strict';

module.exports = function (app) {

    const mongoose = require('mongoose');
    const pergunta = mongoose.model('Pergunta');

    app.post('/pergunta', function (req, res) {

        var data = req.body;
        for (let pergunta of data) {

            var estaValido = valideEstadoDosObjetos(app, pergunta, res);

            if (estaValido) {
                persistaPerguntas(pergunta, res, ehVetorDePergunta(data));
            }
        }
        res.status(201).send({ message: 'Perguntas cadastrada com sucesso' });
    });

    app.get('/pergunta', function (req, res) {

        pergunta.find({}, 'pergunta respostas categoria')
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(404).send({
                    message: 'Pergunta não encontrada',
                    data: e
                });
            });
    });

    app.get('/pergunta/:id', function (req, res) {

        var param = req.params;

        pergunta.findById(param.id, 'pergunta respostas categoria')
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(404).send({
                    message: 'Pergunta não encontrada',
                    data: e
                });
            });
    });

    app.get('/pergunta/titulo/:pergunta', function (req, res) {

        var param = req.params;

        pergunta.find({ pergunta: param.pergunta }, 'pergunta respostas categoria')
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(404).send({
                    message: 'Pergunta não encontrada !',
                    data: e
                });
            });
    });

    app.put('/pergunta/:id', function (req, res) {

        var param = req.params;
        var data = req.body;

        pergunta.findByIdAndUpdate(param.id, {
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
                    message: 'Falha ao atualizar a pergunta !',
                    data: e
                });
            });
    });

    app.delete('/pergunta/:id', function (req, res) {

        var param = req.params;

        pergunta.deleteOne({ "_id": param.id }, function () { }).exec()
            .then(
                res.status(200).send({ message: 'Pergunta Excluido com sucesso' })
            ).catch(error => {
                res.status(404).send({
                    message: 'Falha ao remover a Pergunta !',
                    data: error
                });
            })
    });
    
}

//Funções auxiliares

function ehVetorDePergunta(data) {
    if (data.length > 1) {
        return true;
    } else {
        return false;
    }
}

function persistaPerguntas(data, res, ehVetor) {

    var mongoose = require('mongoose');
    const Pergunta = mongoose.model('Pergunta');
    var pergunta = new Pergunta(data);

    if (!ehVetor) {
        pergunta.save()
            .then(_x => {
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

            return false;
        }

        return true;

    } catch (error) {
        console.log(error + responseValidation)
    }
}