var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = Schema({

    nameProduct: String,
    nameProvider: String,
    stock: Number,
    sale: Number,
    totalSale: Number,

    idCompany: { type: Schema.Types.ObjectId, ref: "empresas" }

});

module.exports = mongoose.model('products', productSchema);