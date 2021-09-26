var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employeeSchema = Schema({

    nameEmployee: String,
    jobEmployee: String,
    departamentEmployee: String,

    idCompany: { type: Schema.Types.ObjectId, ref: "empresas" }

});

module.exports = mongoose.model('employees', employeeSchema);