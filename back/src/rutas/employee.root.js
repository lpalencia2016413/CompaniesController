var express = require("express");
var employeeController = require("../controladores/employee.controller");
var auth = require("../middlewares/authenticated");
var api = express.Router();

api.post("/:idUser/employee/register", auth.ensureAuth, employeeController.register);
api.get("/:idUser/employees", auth.ensureAuth, employeeController.list);
api.put("/:idUser/employee/edit/:idEmployee", auth.ensureAuth, employeeController.edit);
api.delete("/:idUser/employee/delete/:idEmployee", auth.ensureAuth, employeeController.remove);


module.exports = api;