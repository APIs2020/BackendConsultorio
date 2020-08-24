var UserService = require('../services/user.service');
var HistorialClinicoService = require('../services/historialClinico.service');
var HistorialClinicoController = require('./historialesClinicos.controller');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.

    console.log("HISTORIAL CLINICO REQUIRE",req.body.historialClinico)
    var historialClinico = await HistorialClinicoService.createHistorialClinico(req.body.historialClinico);

    var User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dni: req.body.dni,
        fechaNacimiento: req.body.fechaNac,
        pisoDepto: req.body.pisoDepto,
        telefono: req.body.tel,
        domicilio: req.body.domicilio,
        historialClinico: historialClinico,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({token: createdUser, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var User = {
        id,
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null,
        dni: req.body.dni ? req.body.dni : null,
        fechaNacimiento: req.body.fechaNacimiento ? req.body.fechaNacimiento : null,
        pisDepto: req.body.pisDepto ? req.body.pisDepto : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        domicilio: req.body.domicilio ? req.body.domicilio : null,
    }
    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.body._id;

    var user = await UserService.getUsers({_id : id}, 1, 10);

    req.body._id = user.docs[0].historialClinico;
    //Eliminar historial clinico
    if(req.body._id != undefined){
        try {
            var deleted = await HistorialClinicoController.removeHistorialClinico(req, res);
            //res.status(200).send("Succesfully Deleted Historial Clinico... ");
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message})
        }
    }

    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        return res.status(201).json({token: loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}
    
    
