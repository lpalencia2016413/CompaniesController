'use strict'

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
//const cors = require("cors");
var empresa_rutas = require("./src/rutas/empresa.rutas");
var productRoot = require("./src/rutas/product.root");
var employeeRoot = require("./src/rutas/employee.root");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(cors());

app.use('/api', empresa_rutas, productRoot, employeeRoot);

module.exports = app;