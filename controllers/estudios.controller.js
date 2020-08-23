var EstudioService = require('../services/Estudio.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getEstudios = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Estudios = await EstudioService.getEstudios({}, page, limit)
        // Return the Estudios list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Estudios, message: "Succesfully Estudios Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createEstudio = async function (req, res, next) {

    

    // Req.Body contains the form submit values.

    var Estudio = {
        fechaPedido:req.body.fechaPedido,
        fechaRealizado:req.body.fechaRealizado,
        tipo:req.body.tipo,
        descripcion:req.body.descripcion,
        resultado:req.body.resultado,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdEstudio = await EstudioService.createEstudio(Estudio)
        return res.status(201).json({token: createdEstudio, message: "Succesfully Created Estudio"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Estudio Creation was Unsuccesfull"})
    }
}

exports.updateEstudio = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var Estudio = {
        id,
        fechaPedido:req.body.fechaPedido ? req.body.fechaPedido : null,
        fechaRealizado:req.body.fechaRealizado ? req.body.fechaRealizado : null,
        tipo:req.body.tipo ? req.body.tipo : null,
        descripcion:req.body.descripcion ? req.body.descripcion : null,
        resultado:req.body.resultado ? req.body.resultado : null,
    }
    try {
        var updatedEstudio = await EstudioService.updateEstudio(Estudio)
        return res.status(200).json({status: 200, data: updatedEstudio, message: "Succesfully Updated Estudio"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeEstudio = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await EstudioService.deleteEstudio(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
