var EnfermedadService = require('../services/enfermedad.service');
var HistorialClinicoService = require('../services/historialClinico.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getEnfermedadess = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Enfermedades = await EnfermedadService.getEnfermedades({}, page, limit)
        // Return the Enfermedades list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Enfermedades, message: "Succesfully Enfermedades Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createEnfermedad = async function (req, res, next) {

    

    // Req.Body contains the form submit values.

    //console.log("HISTORIAL CLINICO REQUIRE",req.body.historialClinico)
    var historialClinico = await HistorialClinicoService.createHistorialClinico(req.body.historialClinico);

    var Enfermedad = {
        tipo:req.body.tipo,
        nombre: req.body.nombre,
        sintomas: req.body.sintomas,
        fechaDiagnostico: req.body.fechaDiagnostico,
        fechaAlta: req.body.fechaAlta
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdEnfermedad = await EnfermedadService.createEnfermedad(Enfermedad)
        return res.status(201).json({token: createdEnfermedad, message: "Succesfully Created Enfermedad"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Enfermedad Creation was Unsuccesfull"})
    }
}

exports.updateEnfermedad = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var Enfermedad = {
        id,
        tipo:req.body.tipo ? req.body.tipo : null,
        nombre: req.body.nombre ? req.body.nombre : null,
        sintomas: req.body.sintomas ? req.body.sintomas : null,
        fechaDiagnostico: req.body.fechaDiagnostico ? req.body.fechaDiagnostico : null,
        fechaAlta: req.body.fechaAlta ? req.body.fechaAlta : null
    }
    try {
        var updatedEnfermedad = await EnfermedadService.updateEnfermedad(Enfermedad)
        return res.status(200).json({status: 200, data: updatedEnfermedad, message: "Succesfully Updated Enfermedad"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeEnfermedad = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await EnfermedadService.deleteEnfermedad(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


