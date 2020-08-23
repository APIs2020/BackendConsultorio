var InternacionService = require('../services/Internacion.service');
var HistorialClinicoService = require('../services/historialClinico.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getInternaciones = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Internaciones = await InternacionService.getInternaciones({}, page, limit)
        // Return the Internacions list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Internaciones, message: "Succesfully Internacions Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createInternacion = async function (req, res, next) {

    

    // Req.Body contains the form submit values.

    var Internacion = {
        fechaIngreso: req.body.fechaIngreso,
        fechaEgreso: req.body.fechaEgreso,
        diagnostico: req.body.diagnostico,
        habitacion: req.body.habitacion,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdInternacion = await InternacionService.createInternacion(Internacion)
        return res.status(201).json({token: createdInternacion, message: "Succesfully Created Internacion"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Internacion Creation was Unsuccesfull"})
    }
}

exports.updateInternacion = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var Internacion = {
        id,
        fechaIngreso: req.body.fechaIngreso ? req.body.fechaIngreso : null,
        fechaEgreso: req.body.fechaEgreso ? req.body.fechaEgreso : null,
        diagnostico: req.body.diagnostico ? req.body.diagnostico : null,
        habitacion: req.body.habitacion ? req.body.habitacion : null,
    }
    try {
        var updatedInternacion = await InternacionService.updateInternacion(Internacion)
        return res.status(200).json({status: 200, data: updatedInternacion, message: "Succesfully Updated Internacion"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeInternacion = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await InternacionService.deleteInternacion(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
