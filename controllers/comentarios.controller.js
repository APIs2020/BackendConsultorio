var ComentarioService = require('../services/comentario.service');
var HistorialClinicoService = require('../services/historialClinico.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getComentarios = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Comentarios = await ComentarioService.getComentarios({}, page, limit)
        // Return the Comentarios list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comentarios, message: "Succesfully Comentarios Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createComentario = async function (req, res, next) {

    

    // Req.Body contains the form submit values.

    //console.log("HISTORIAL CLINICO REQUIRE",req.body.historialClinico)
    var historialClinico = await HistorialClinicoService.createHistorialClinico(req.body.historialClinico);

    var Comentario = {
        fecha: req.body.fecha ? req.body.fecha : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdComentario = await ComentarioService.createComentario(Comentario)
        return res.status(201).json({token: createdComentario, message: "Succesfully Created Comentario"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Comentario Creation was Unsuccesfull"})
    }
}

exports.updateComentario = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var Comentario = {
        id,
        fecha: req.body.fecha ? req.body.fecha : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null
    }  
    try {
        var updatedComentario = await ComentarioService.updateComentario(Comentario)
        return res.status(200).json({status: 200, data: updatedComentario, message: "Succesfully Updated Comentario"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeComentario = async function (req, res, next) {

    var id = req.body._id;
    try {
        var deleted = await ComentarioService.deleteComentario(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
    
