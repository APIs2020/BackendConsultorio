var HistCliService = require('../services/histCli.service');
const HistCliSchema = require('../models/HistClinica.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getHistClinicas = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var histClinicas = await HistCliService.getHistClinicas({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: histClinicas, message: "Succesfully Historias Clinicas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createHistClinica = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var HistClinica = {
        peso:req.body.peso,
        altura:req.body.altura,
        fechaNac:req.body.fechaNac,
        grupoSan:req.body.grupoSan,
        fechaInicio:req.body.fechaInicio
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdHistClinica = await HistCliService.createHistClinica(HistClinica)
        return res.status(201).json({token: createdHistClinica, message: "Succesfully Created Historia Clinica"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateHistClinica = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var HistClinica = {
        id,
        peso: req.body.peso ? req.body.peso : null,
        altura: req.body.altura ? req.body.altura : null,
        fechaNac: req.body.fechaNac ? req.body.fechaNac : null,
        grupoSan: req.body.grupoSan ? req.body.grupoSan : null,
        fechaInicio: req.body.fechaInicio ? req.body.fechaInicio : null
    }
    try {
        var updatedHistClinica = await HistCliService.updateHistClinica(HistClinica)
        return res.status(200).json({status: 200, data: updatedHistClinica, message: "Succesfully Updated Historia Clinica"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeHistClinica = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await HistCliService.deleteHistClinica(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
    
    
