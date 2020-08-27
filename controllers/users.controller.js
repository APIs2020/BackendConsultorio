var UserService = require('../services/user.service');
var HistorialClinicoService = require('../services/historialClinico.service');
var HistorialClinicoController = require('./historialesClinicos.controller');

const nodemailer = require("nodemailer");

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

exports.getUsersByTipo = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var filtro = {tipo : req.body.tipo};
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUsersByEspecialidad = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var filtro = {especialidad : req.body.especialidad};
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUsersByDNI = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var filtro = {dni : req.body.dni};
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.

    var historialClinico = await HistorialClinicoService.createHistorialClinico(req.body.historialClinico);

    var User = {
        name: req.body.name,
        apellido : req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        dni: req.body.dni,
        fechaNacimiento: req.body.fechaNac,
        pisoDepto: req.body.pisoDepto,
        telefono: req.body.tel,
        domicilio: req.body.domicilio,
        tipo: req.body.tipo,
        especialidad: req.body.especialidad,
        historialClinico: historialClinico
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)

        let cuerpo = "<html>Gracias por registrarte en Vital Care<br><br>Por favor, confirme su usuario haciendo clic aqui</html>"

        let transporter = nodemailer.createTransport({
            host: "email-smtp.sa-east-1.amazonaws.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "AKIAR4I6MM677CYBYJVM", // generated ethereal user
              pass: 'BAGEGRHgeXiVoR0aI4kU8Ad8hUmrnX1DGmvPGZ6jkaXN', // generated ethereal password
            },
          });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Consultorio Vital Care" <admin@seconline.net.ar>', // sender address
          to: User.email, // list of receivers
          subject: "Confirme su usuario", // Subject line
          text: "Gracias por registrarte en Vital Care. Por favor, confirme su usuario haciendo clic aqui",
          html: cuerpo, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return res.status(201).json({createdUser, message: "Succesfully Created User"})
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
        apellido: req.body.apellido ? req.body.apellido : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null,
        dni: req.body.dni ? req.body.dni : null,
        fechaNacimiento: req.body.fechaNacimiento ? req.body.fechaNacimiento : null,
        pisDepto: req.body.pisDepto ? req.body.pisDepto : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        domicilio: req.body.domicilio ? req.body.domicilio : null,
        tipo: req.body.tipo ? req.body.tipo : null,
        especialidad: req.body.especialidad ? req.body.especialidad : null,
    }
    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.params.id;

    var user = await UserService.getUsers({_id : id}, 1, 10);

    req.params.id = user.docs[0].historialClinico;
    //Eliminar historial clinico
    if(req.params.id != undefined){
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
        dni: req.body.dni,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        return res.status(201).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}