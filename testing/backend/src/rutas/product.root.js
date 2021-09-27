var express = require("express");
var productController = require("../controladores/product.controller");
var auth = require("../middlewares/authenticated");
var api = express.Router();


api.post("/:idUser/product/register",auth.ensureAuth, productController.register);
api.get("/:idUser/products", auth.ensureAuth, productController.list);
api.put("/:idUser/product/edit/:idProduct", auth.ensureAuth, productController.edit);
api.delete("/:idUser/product/delete/:idProduct", auth.ensureAuth, productController.remove);





module.exports = api;