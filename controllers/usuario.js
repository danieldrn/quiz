module.exports = function (app) {

    const mongoose = require('mongoose');
    const usuario = mongoose.model('Usuario');

    app.post('/usuario', function (req, res) {

        var data = req.body;
        var estaValido = valideEstadoDosObjetos(app, data, res);

        if (estaValido) {
            persistaUsuario(data, res);
        }

    });

    app.get('/usuario', function (req, res) {

        usuario.find({})
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(404).send({
                    message: 'Usuarios não encontrados !!',
                    data: e
                });
            });
    });

    app.get('/usuario/:id', function (req, res) {

        var param = req.params;

        usuario.findById(param.id, '')
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(404).send({
                    message: 'Usuario não encontrado !!',
                    data: e
                });
            });
    });

    app.put('/usuario/:id', function (req, res) {

        var param = req.params;
        var data = req.body;

        usuario.findByIdAndUpdate(param.id, {
            $set: {
                pergunta: data.pergunta,
                respostas: data.respostas,
                usuario: data.usuario
            }
        })
            .then(data => {
                res.status(201).send('Usuario atualizado com sucesso' + data);
            }).catch(e => {
                res.status(400).send({
                    message: 'Falha ao atualizar o usuario !',
                    data: e
                });
            });
    });

    app.delete('/usuario/:id', function (req, res) {

        var param = req.params;

        usuario.deleteOne({ "_id": param.id}, function () { }).exec()
        .then(
            res.status(200).send({ message: 'Usuario Excluido com sucesso' })
        ).catch(error => {
            res.status(404).send({
                message: 'Falha ao remover o usuario !',
                data: error
            });
        })
    });
}

//Funções auxiliares

function persistaUsuario(data, res) {

    var mongoose = require('mongoose');
    const Usuario = mongoose.model('Usuario');
    var usuario = new Usuario(data);

    try {
        usuario.save().send({ message: 'Usuario cadastrado com sucesso' });
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao persistir a usuario',
            data: error
        });
    }

}

function valideEstadoDosObjetos(app, data, res) {

    try {

        var serviceUsuario = new app.services.usuarioService();
        var responseValidation = serviceUsuario.validarDados(data);

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