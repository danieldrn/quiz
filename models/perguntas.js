'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pergunta: {
        type: String,
        required: true,
    },
    respostas: [{
        type: String,
        required: true
    }],
    categoria: {
        label: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        condicao: {
            type: Boolean,
            required: true,
            default: true
        }
    },

});

module.exports = mongoose.model('Product', schema);