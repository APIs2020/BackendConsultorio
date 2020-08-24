var DispTurnoService = require('../services/dispTurno.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getDispTurnos = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var DispTurnos = await DispTurnosService.getRecetas({}, page, limit)
        // Return the Recetas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: DispTurnos, message: "Succesfully DispTurnos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createDispTurno = async function (req, res, next) {

    

    // Req.Body contains the form submit values.

    var DispTurno = {
        profesional: req.body.profesional,
        fecha: req.body.fecha,
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var createdDispTurno = await DispTurnoService.createDispTurno(DispTurno)
        return res.status(201).json({token: createdDispTurno, message: "Succesfully Created DispTurno"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "DispTurno Creation was Unsuccesfull"})
    }
}

exports.removeDispTurno = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await DispTurnoService.deleteDispTurno(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}