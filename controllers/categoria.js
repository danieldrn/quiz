'use strict';

module.exports = function (app) {

    const mongoose = require('mongoose');
    const Categoria = mongoose.model('Categoria');

    app.post('/categoria', function (req, res) {

        var data = req.body;

        for (let categoria of data) {

            var estaValido = valideEstadoDosObjetos(app, categoria, res);

            if (estaValido) {
                persistaCategoria(categoria, res, ehVetorDeCategoria(data));
            }
        }

        res.status(201).send({ message: 'Categoria cadastrada com sucesso' });

    });

    app.get('/categoria', function (req, res) {

        Categoria.find({})
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(404).send({
                    message: 'Pergunta não encontrada',
                    data: e
                });
            });
    });

    app.get('/categoria/:id', function (req, res) {

        var param = req.params;

        Categoria.findById(param.id, '')
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(404).send({
                    message: 'Categoria não encontrada',
                    data: e
                });
            });
    });

    app.put('/categoria/:id', function (req, res) {

        var param = req.params;
        var data = req.body;

        Categoria.findByIdAndUpdate(param.id, {
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

    app.delete('/categoria/:id', function (req, res) {

        var param = req.params;

        Categoria.findByIdAndDelete(param.id, {
        })
            .then(data => {
                res.status(200).send('Pergunta removida com sucesso' + data);
            }).catch(e => {
                res.status(404).send({
                    message: 'Falha ao remover a pergunta !',
                    data: e
                });
            });
    });

    app.delete('/categoria/desativar/:id', function (req, res) {

        var param = req.params;

        Categoria.findByIdAndUpdate(param.id, {
            $set: {
                estaAtiva: false
            }
        })
            .then(data => {
                res.status(201).send('Categoria desativada com sucesso' + data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao desativar a pergunta !',
                    data: e
                });
            });
    });

}

//Funções auxiliares

function ehVetorDeCategoria(data) {
    if (data.length > 1) {
        return true;
    } else {
        return false;
    }
}

function persistaCategoria(data, res, ehVetor) {

    var mongoose = require('mongoose');
    const Categoria = mongoose.model('Categoria');
    var categoria = new Categoria(data);

    if (!ehVetor) {
        categoria.save()
            .then(_x => {
                res.status(201).send({ message: 'Categoria cadastrada com sucesso' });
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao persistir a Categoria',
                    data: e
                });
            });
    } else {

        try {
            categoria.save();
        } catch (error) {
            res.status(400).send({
                message: 'Falha ao persistir a Categoria',
                data: error
            });
        }

    }
}

function valideEstadoDosObjetos(app, data, res) {

    try {

        var serviceCategoria = new app.services.categoriaService();
        var responseValidation = serviceCategoria.validarDados(data);

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