var TurnoService = require('../services/turno.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getTurnos = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Turnos = await TurnosService.getRecetas({}, page, limit)
        // Return the Recetas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Turnos, message: "Succesfully Turnos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTurno = async function (req, res, next) {

    

    // Req.Body contains the form submit values.

    var Turno = {
        nombrePaciente: req.body.nombrePaciente,
        especialidad: req.body.especialidad,
        fecha: req.body.fecha,
        dni: req.body.dni,
        profesional: req.body.profesional,
        sucursal: req.body.sucursal
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var createdTurno = await TurnoService.createTurno(Turno)
        return res.status(201).json({token: createdTurno, message: "Succesfully Created Turno"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Turno Creation was Unsuccesfull"})
    }
}

exports.removeTurno = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await TurnoService.deleteTurno(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}