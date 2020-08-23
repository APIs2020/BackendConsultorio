var HistorialClinicoService = require('../services/historialClinico.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getHistorialesClinicos = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var historialesClinicos = await HistorialClinicoService.getHistorialesClinicos({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: historialesClinicos, message: "Succesfully Historias Clinicas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getHistorialClinicoByUser = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var filtro = {_id : req.body._id};
    try {
        var historialClinico = await HistorialClinicoService.getHistorialesClinicos(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: historialClinico, message: "Succesfully Historias Clinicas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createHistorialClinico = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("BODY REQ CREATE HIST CLINICA",req.body)
    if(req.body == null){
        var HistorialClinica = {
            peso: "",
            altura: "",
            grupoSan: "",
            fechaInicio: ""
        }
    } else {
        var HistorialClinica = {
            peso: req.body.peso,
            altura: req.body.altura,
            grupoSan: req.body.grupoSan,
            fechaInicio: req.body.fechaInicio
        }
    }
    console.log("var HistorialClinia")
    try {
        // Calling the Service function with the new object from the Request Body
        var createdHistorialClinica = await HistorialClinicoService.createHistorialClinico(HistorialClinica)
        return res.status(201).json({token: createdHistorialClinica, message: "Succesfully Created Historial Clinico"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Historial Clinico Creation was Unsuccesfull"})
    }
}

exports.updateHistorialClinico = async function (req, res, next) {

        // Id is necessary for the update
        if (!req.body._id) {
            return res.status(400).json({status: 400., message: "Id must be present"})
        }
    
        var id = req.body._id;
        var HistorialClinico = {
            id,
            peso: req.body.peso ? req.body.peso : null,
            altura: req.body.altura ? req.body.altura : null,
            grupoSan: req.body.grupoSan ? req.body.grupoSan : null,
            fechaInicio: req.body.fechaInicio ? req.body.fechaInicio : null,
            comentarios: req.body.comentarios ? req.body.comentarios : null,
        }
        try {
            var updatedHistorialClinico = await HistorialClinicoService.updateHistorialClinico(HistorialClinico)
            return res.status(200).json({status: 200, data: updatedHistorialClinico, message: "Succesfully Updated User"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
}

exports.removeHistorialClinico = async function (req, res, next) {

    var id = req.body._id;
    try {
        var deleted = await HistorialClinicoService.deleteHistorialClinico(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
    
    
