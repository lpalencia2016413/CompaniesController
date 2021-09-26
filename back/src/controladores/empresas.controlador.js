'use strict'
var Empresa = require("../modelos/empresa.model");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");

function admin(req, res) {
    var empresaModel = Empresa();   
    empresaModel.username = "Administrador"
    empresaModel.correo= "admin@admin.com"
    empresaModel.rol="ROL_ADMIN"
    Empresa.find({ 
        username: "Administrador"
    }).exec((err, adminEncontrado )=>{
        if(err) return console.log({mensaje: "Error al crear Administrador"});
        if(adminEncontrado.length >= 1){
        return console.log("El Administrador esta preparado");
        }else{bcrypt.hash("123456", null, null, (err, passwordEncriptada)=>{
            empresaModel.password = passwordEncriptada;
            empresaModel.save((err, usuarioguardado)=>{
                if(err) return console.log({mensaje : "Error en la peticion"});
                if(usuarioguardado){console.log("Administrador preparado");
                }else{
                console.log({mensaje:"El administrador no esta listo"});
                }      
            })     
        })
        }
    })
}

function agregarEmpresa(req, res) {
    var empresaModel = new Empresa();
    var params = req.body;
    var params = req.body;
    
    if (params.correo && params.password && params.username && params.nombre && params.nit &&
    params.web && params.direccion) {
        empresaModel.nombre = params.nombre;
        empresaModel.correo = params.correo;
        empresaModel.username = params.username;
        empresaModel.pbx = params.pbx;
        empresaModel.nit = params.nit;
        empresaModel.web = params.web;
        empresaModel.direccion = params.direccion;
        Empresa.find(
            { username: empresaModel.username }
        ).exec((err, empresasEncontradas) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Empresas' });
            if (empresasEncontradas && empresasEncontradas.length >= 1) {
                return res.status(500).send({ mensaje: 'El username ya esta ocupado' });
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    empresaModel.password = passwordEncriptada;

                    empresaModel.save((err, empresaGuardada) => {
                        

                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Guardar Empresa' });

                        if (empresaGuardada) {
                            res.status(200).send({ empresaGuardada })
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar el Empresa' })
                        }
                    })
                })
            }
        })

    }
}

function login(req, res) {
    var params = req.body; 
    Empresa.findOne({username: params.username}, (err, empresaEncontrada)=>{
        if(err) return res.status(500).send({mensaje: "Error en la petición"});
        if(empresaEncontrada){
            bcrypt.compare(params.password, empresaEncontrada.password, (err, passVerificada)=>{
                if(err) return res.status(500).send({mensaje: "Error en la petición"});
                if(passVerificada){
                     if(params.getToken == "true"){
                        return res.status(200).send({token: jwt.createToken(empresaEncontrada)});
                     }else{
                        empresaEncontrada.password = undefined;
                        return res.status(200).send({empresaEncontrada});
                     }
                }else{
                    return res.status(500).send({mensaje:"La Empresa no se a podido identificar"});
                }
            })


        }else{
            return res.status(500).send({mensaje:"Error al buscar la Empresa"})
        }
    })
}

function eliminarEmpresa(req, res){
    var idEmpresa= req.user.sub;

    if(req.user.rol === "ROL_ADMIN"){
        return res.status(500).send({mensaje: "No se puede eliminar al Administrador principal"});
    }
    Empresa.findByIdAndDelete(idEmpresa,(err, empresaEliminada)=>{
    if(err) return res.status(500).send({mensaje:"Error en la peticion"});
    if(!empresaEliminada) return res.status(500).send({mensaje:"No se ha podido Eliminar la empresa"});
    return res.status(200).send({mensaje: "Se ha eliminado la Empresa"});
    })

    
}

function editarEmpresa(req, res) {
    var idEmpresa = req.user.sub;
    var params = req.body;
    if (req.user.rol != "ROL_ADMIN") {
        Empresa.find(
            { username: params.username }
        ).exec((err, empresaEncontrada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Empresa' });
            if (empresaEncontrada && empresaEncontrada.length >= 1) {
                return res.status(500).send({ mensaje: 'El username ya existe' });
            }
            Empresa.findByIdAndUpdate(idEmpresa, params, { new: true }, (err, empresaActualizada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empresaActualizada) return res.status(500).send({ mensaje: 'No se a podido editar la Empresa' });
            return res.status(200).send({ empresaActualizada })
            })
        })   
    }else{
        return res.status(500).send({ mensaje: 'No se puede editar al Administrador principal' });
    }
}

function obtenerEmpresas(req, res) {
    var rolUsuario = req.user.rol;

    if (rolUsuario == "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No eres un Administrador' });
    }else{
        Empresa.find().exec((err, empresasEncontradas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Empresas' });
        if (!empresasEncontradas) return res.status(500).send({ mensaje: 'Error en la consutla de Empresas o no tiene datos' });
        return res.status(200).send({ empresasEncontradas });
    })
    }
}

function obtenerEmpresa(req, res) {
    var rol = req.user.rol;
    var nombreBusqueda = req.params.id
    if (rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: 'No eres un Administrador' });
    }else{
        Empresa.findOne({_id: nombreBusqueda}).exec((err, empresa) => {
            if(err){res.status(500).send("Error en la peticion");
            }else{
                if (!empresa) return res.status(500).send({mensaje: "No Existe un Empresa con ese nombre"})
                return res.status(200).send({ empresa });
            }
        })
    }
}

module.exports = {
    admin,
    agregarEmpresa,
    login,
    eliminarEmpresa,
    editarEmpresa,
    obtenerEmpresas,
    obtenerEmpresa
}