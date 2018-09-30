'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pergunta: {
        type: String,
        required: true,
    },
    respostas: [{
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
    }],
    categoria: {
        type: Number,
        required: true
    },

});

module.exports = mongoose.model('Pergunta', schema);