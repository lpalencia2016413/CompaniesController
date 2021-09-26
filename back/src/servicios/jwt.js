'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_IN6AV';

exports.createToken = function (empresa) {
    var payload = {
        sub: empresa._id,
        nombre: empresa.nombre,
        username: empresa.username,
        correo: empresa.correo,
        imagen: empresa.imagen,
        rol: empresa.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}