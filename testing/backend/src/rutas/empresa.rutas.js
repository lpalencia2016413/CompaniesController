'use strict'
var express = require("express");
var empresaControlador = require("../controladores/empresas.controlador");
var md_autorizacion = require("../middlewares/authenticated");
var api = express.Router();

api.post("/agregarEmpresa", empresaControlador.agregarEmpresa);
api.post("/login", empresaControlador.login);
api.delete('/eliminarEmpresa', md_autorizacion.ensureAuth, empresaControlador.eliminarEmpresa);
api.put('/editarEmpresa', md_autorizacion.ensureAuth, empresaControlador.editarEmpresa);
api.get('/obtenerEmpresas', md_autorizacion.ensureAuth ,empresaControlador.obtenerEmpresas);
api.get('/obtenerEmpresa/:id', md_autorizacion.ensureAuth ,empresaControlador.obtenerEmpresa);
module.exports = api;