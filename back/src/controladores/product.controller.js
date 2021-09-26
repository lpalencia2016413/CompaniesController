var productModel = require("../modelos/product.model");
var token = require("../servicios/jwt");

var jsonResponse = {
    err: 500,
    message: null,
    data: null
}

// ======================================================================================================== \\

function register(req, res){

    var idUser = req.params.idUser
    var dataToken = req.user
    var params = req.body;

    var registerModel;
    var schema= {}

    params.nameProduct?schema.nameProduct = params.nameProduct:null;
    params.nameProvider?schema.nameProvider = params.nameProvider:null;
    params.stock?schema.stock = params.stock:null;
    schema.sale = 0;
    dataToken.sub?schema.idCompany = dataToken.sub:null;

        if(dataToken.sub == idUser){
            if(
                params.nameProduct &&
                params.nameProvider &&
                params.stock
    
            ){
    
                productModel.findOne({
                    $and: [
                        {nameProduct:params.nameProduct},
                        {nameProvider:params.nameProvider},
                        {idCompany: dataToken.sub}
                    ]
                }).exec((err,productFound)=>{
                    if(err){
                        jsonResponse.message = "error del servidor al comparar producto";
                        
                        res.status(jsonResponse.err).send(jsonResponse);
                        statusClean();
                    }else{
                        if(productFound){
                            jsonResponse.err = 404;
                            jsonResponse.message = "Error, producto ya registrado";
                            
                            res.status(jsonResponse.err).send(jsonResponse);
                            statusClean();
                        }else{
                            registerModel = new productModel(schema);
                            registerModel.save((err,productSaved)=>{
                                if(err){
                                jsonResponse.message = "Error de registro del servidor"
                                
                                res.status(jsonResponse.err).send(jsonResponse);
                                statusClean();
                                }else{
                                    if(productSaved){
                                        jsonResponse.err = 200;
                                        jsonResponse.message = `${productSaved.nameProvider}: ${productSaved.nameProduct}, Registrado Exitosamente!!`
                                        jsonResponse.data = productSaved
            
                                    }else{
                                        jsonResponse.err = 404;
                                        jsonResponse.message = "Error al registrar Producto"
    
                                    }
                                    res.status(jsonResponse.err).send(jsonResponse);
                                    statusClean();
                                }
                            }) 
                        }
                    }
                })
            }
        }
        
    
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \\

function list(req, res){
   
    var idUser = req.params.idUser;
    var datatoken = req.user;

    productModel.find({idCompany:idUser}).exec((err,products)=>{
        if(err){
            jsonResponse.message = "error del servidor al momento de listar"
           
        }else{
            console.log(datatoken.nombre)
            jsonResponse.err = 200;
            jsonResponse.message = `Lista De Productos: ${datatoken.nombre} `;
            jsonResponse.data = products
            
        }
        res.status(jsonResponse.err).send(jsonResponse);
        statusClean();
    })
   
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \\

function edit(req, res){
    
    var params = req.body;
    var idUser = req.params.idUser;
    var idProduct = req.params.idProduct;
    var dataToken = req.user;

    var schema = {};

    params.nameProduct?schema.nameProduct = params.nameProduct:null;
    params.nameProvider?schema.nameProvider = params.nameProvider:null;
    params.stock?schema.stock = params.stock:null;
    params.sale?schema.sale = params.sale:null;

    if(dataToken.sub == idUser){
        if(params.stock >= params.sale){
            productModel.findByIdAndUpdate(idProduct,schema,{new: true, useFindAndModify: false},(err, productUpdated)=>{
                if(err){
                    jsonResponse.message = "error en el servidor al actualizar"
                    
                    res.status(jsonResponse.err).send(jsonResponse);
                    statusClean();
                }else{
                    if(productUpdated){
                        jsonResponse.err = 200;
                        jsonResponse.message = `${productUpdated.nameProvider}: ${productUpdated.nameProduct}, actualizado!!`
                        jsonResponse.data = productUpdated;
                        
                    }else{
                        jsonResponse.err = 404;
                        jsonResponse.message = "Producto no existente"
                    }
                    res.status(jsonResponse.err).send(jsonResponse);
                    statusClean();
                }
            })
        }else{
            jsonResponse.err = 404;
            jsonResponse.message = "venta mayor que existencia del producto"
            res.status(jsonResponse.err).send(jsonResponse)
            statusClean();
        }
        
    }



}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \\

function remove(req,res){

    var dataToken = req.user;
    var idUser = req.params.idUser;
    var idProduct = req.params.idProduct;

    if(dataToken.sub == idUser){
        productModel.findByIdAndDelete(idProduct,(err, productDeleted)=>{
            if(err){
                jsonResponse.message = "error del servidor al eliminar";

                res.status(jsonResponse.err).send(jsonResponse);
                statusClean();
            }else{
                if(productDeleted){
                    jsonResponse.err = 200;
                    jsonResponse.message = `${productDeleted.nameProvider}: ${productDeleted.nameProduct}, eliminidado!!`
                
                }else{
                    jsonResponse.err = 404;
                    jsonResponse.message = "producto no existente";
                
                }
                res.status(jsonResponse.err).send(jsonResponse);
                statusClean();
            }
        })
    }

}

//=====================================================================================================\\
//                                         Reusable functions 
//=====================================================================================================\\

function statusClean(){
    jsonResponse = {
        error: 500,
        message: null,
        data: null,
        token: null
    }
}


module.exports = {
    register,
    list,
    edit,
    remove
}