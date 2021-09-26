'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombre: String,
    correo: String,
    username: String,
    password: String,
    pbx: Number,
    nit: Number,
    web: String,
    direccion: String
});

module.exports = mongoose.model('empresas', EmpresaSchema);