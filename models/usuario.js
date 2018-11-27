const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: Number,
        required: true
    },
    secret: {
        type: Number,
    },
    perfil: {
        type: Number,
        required: true,
        default: 1
    },
});

module.exports = mongoose.model('usuario', schema);