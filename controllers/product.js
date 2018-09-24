'use strict';

module.exports = function (app) {

    const mongoose = require('mongoose');
    const Product = mongoose.model('Product');

    app.post('/product', function (req, res) {

        var produto = new Product(req.body);

        produto.save()
            .then(x => {
                res.status(201).send({ message: 'Produto cadastrado com sucesso' });
            }).catch(e => {
                res.status(400).send({
                    message: 'Produto não cadastrado com sucesso',
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

    exports.put = (req, res, next) => {

        const id = req.params.id;

        res.status(200).send({
            id: id,
            item: req.body
        });
    };
}