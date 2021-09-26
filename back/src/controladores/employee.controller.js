var employeeModel = require("../modelos/employee.model");
var jwt = require("../servicios/jwt");





var jsonResponse = {
    err: 500,
    message: null,
    data: null,
    token: null
}
// ========================================================================================================\\

function register(req, res){

    var params = req.body;
    var idUser = req.params.idUser;
    var dataToken = req.user;

    var registerModel;
    var schema = {};

    params.nameEmployee?schema.nameEmployee = params.nameEmployee:null;
    params.jobEmployee?schema.jobEmployee = params.jobEmployee:null;
    params.departamentEmployee?schema.departamentEmployee = params.departamentEmployee:null;
    dataToken.sub?schema.idCompany = dataToken.sub:null;

    if(dataToken.sub == idUser){
        if(
            params.nameEmployee &&
            params.jobEmployee &&
            params.departamentEmployee
        ){

            employeeModel.find({
                $and:[
                    {nameEmployee:params.nameEmployee},
                    {jobEmployee:params.jobEmployee},
                    {departamentEmployee:params.departamentEmployee},
                    {idCompany:dataToken.sub},
                    
                ]
            }).exec((err, employeeFound)=>{
                if(err){
                    jsonResponse.message = "error de servidor";

                    res.status(jsonResponse.err).send(jsonResponse);
                    statusClean();
                }else{
                    if(employeeFound && employeeFound.length >= 1){
                        jsonResponse.err = 400;
                        jsonResponse.message = `Error, usuario ya registrado`
                        jsonResponse.data = employeeFound
                        
                        res.status(jsonResponse.err).send(jsonResponse);
                        statusClean();
                    }else{
                        registerModel = new employeeModel(schema);
                        registerModel.save((err,employeeSaved)=>{
                            if(err){
                                jsonResponse.message = "error del servidor al guardar usuario"

                            }else{
                                jsonResponse.err = 200;
                                jsonResponse.message = `usuario: ${employeeSaved.nameEmployee} registrado!!!`
                                jsonResponse.data = employeeSaved;
                                
                            }
                            res.status(jsonResponse.err).send(jsonResponse);
                            statusClean();
                        })
                    }
                }
            })
        }else{
            jsonResponse.err = 400;
            jsonResponse.message= "llene todos los campos solicitados";

            res.status(jsonResponse.err).send(jsonResponse);
            statusClean();
        }
    }else{
        jsonResponse.err = 403;
        jsonResponse.message = "No posees los permisos necesarios";

        res.status(jsonResponse.err).send(jsonResponse);
        statusClean();
    }

}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \\

function list(req, res){

    var idUser= req.params.idUser;
    var dataToken = req.user;
    
    if(dataToken.sub == idUser){
        employeeModel.find({idCompany: idUser}).exec((err,listFound)=>{
            if(err){
                jsonResponse.message = "error del servidor";

                res.status(jsonResponse.err).send(jsonResponse);
                statusClean();
            }else{
                if(listFound && listFound.length >= 1){
                    jsonResponse.err = 200;
                    jsonResponse.message = `Lista de empleados: ${dataToken.username}`;
                    jsonResponse.data = listFound;

                }else{
                    jsonResponse.err = 404;
                    jsonResponse.message = "No se encontro la lista de empleados"
                
                }
                res.status(jsonResponse.err).send(jsonResponse);
                statusClean();
            }
        });
    }else{
        jsonResponse.err = 403;
        jsonResponse.message = "no tienes permisos necesarios";
        
        res.status(jsonResponse.err).send(jsonResponse);
        statusClean();
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \\

function edit(req, res){

    var params = req.body;
    var idEmployee = req.params.idEmployee;
    var idUser = req.params.idUser;
    var dataToken = req.user;

    var schema = {};

    params.nameEmployee?schema.nameEmployee = params.nameEmployee:null;
    params.jobEmployee?schema.jobEmployee = params.jobEmployee:null;
    params.departamentEmployee?schema.departamentEmployee = params.departamentEmployee:null;
    

    if(dataToken.sub == idUser){
        employeeModel.findByIdAndUpdate(idEmployee,schema,{new: true, useFindAndModify: false},(err, employeeUpdated)=>{
            if(err){
                jsonResponse.message = "error en el servidor al actualizar"
                
                res.status(jsonResponse.err).send(jsonResponse);
                statusClean();
            }else{
                if(employeeUpdated){
                    jsonResponse.err = 200;
                    jsonResponse.message = `${employeeUpdated.jobEmployee}: ${employeeUpdated.nameEmployee}, actualizado!!`
                    jsonResponse.data = employeeUpdated;
                    
                }else{
                    jsonResponse.err = 404;
                    jsonResponse.message = "empleado no existente"
                }
                res.status(jsonResponse.err).send(jsonResponse);
                statusClean();
            }
        }) 
    }

}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \\

function remove(req,res){

    var dataToken = req.user;
    var idUser = req.params.idUser;
    var idEmployee = req.params.idEmployee;

    if(dataToken.sub == idUser){
        employeeModel.findByIdAndDelete(idEmployee,(err, employeeDeleted)=>{
            if(err){
                jsonResponse.message = "error del servidor al eliminar";

                res.status(jsonResponse.err).send(jsonResponse);
                statusClean();
            }else{
                if(employeeDeleted){
                    jsonResponse.err = 200;
                    jsonResponse.message = `${employeeDeleted.jobEmployee}: ${employeeDeleted.nameEmployee}, eliminidado!!`
                
                }else{
                    jsonResponse.err = 404;
                    jsonResponse.message = "empleado no existente";
                
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