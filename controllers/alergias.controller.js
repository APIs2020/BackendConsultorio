var AlergiaService = require('../services/alergia.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getAlergias = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Alergias = await AlergiaService.getAlergias({}, page, limit)
        // Return the Alergias list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Alergias, message: "Succesfully Alergias Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getAlergiaByID = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var filtro = {_id : req.body._id};
    try {
        var alergia = await AlergiaService.getAlergias(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: alergia, message: "Succesfully Alergia Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createAlergia = async function (req, res, next) {

    

    // Req.Body contains the form submit values.

    var Alergia = {
        tipo: req.body.tipo ? req.body.tipo : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null,
        
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdAlergia = await AlergiaService.createAlergia(Alergia)
        return res.status(201).json({token: createdAlergia, message: "Succesfully Created Alergia"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Alergia Creation was Unsuccesfull"})
    }
}

exports.updateAlergia = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var Alergia = {
        id,
        fechaDiagnostico: req.body.fechaDiagnostico ? req.body.fechaDiagnostico : null,
        tipo: req.body.tipo ? req.body.tipo : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null,
    }
    try {
        var updatedAlergia = await AlergiaService.updateAlergia(Alergia)
        return res.status(200).json({status: 200, data: updatedAlergia, message: "Succesfully Updated Alergia"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeAlergia = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await AlergiaService.deleteAlergia(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
    
    
