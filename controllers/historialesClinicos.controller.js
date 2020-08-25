var HistorialClinicoService = require('../services/historialClinico.service');
var ComentarioService = require('../services/comentario.service');
var EstudioService = require('../services/estudio.service');
var EnfermedadService = require('../services/enfermedad.service');
var AlergiaService = require('../services/alergia.service');
var InternacionService = require('../services/internacion.service');
var MedicamentoService = require('../services/medicamento.service');
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
            alergias: req.body.alergias ? req.body.alergias : null,
            medicamentos: req.body.medicamentos ? req.body.medicamentos : null,
            estudios: req.body.estudios ? req.body.estudios : null,
            internaciones: req.body.internaciones ? req.body.internaciones : null,
            enfermedades: req.body.enfermedades ? req.body.enfermedades : null,
        }
        try {
            var updatedHistorialClinico = await HistorialClinicoService.updateHistorialClinico(HistorialClinico)
            return res.status(200).json({status: 200, data: updatedHistorialClinico, message: "Succesfully Updated Historial Clinico"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
}

exports.removeHistorialClinico = async function (req, res, next) {

    var id = req.params.id;

    var historialClinico = await HistorialClinicoService.getHistorialesClinicos({_id : id}, 1, 10);

    //Eliminar alergias
    if(historialClinico.docs[0].alergias != undefined){
        for(var i = 0; i < historialClinico.docs[0].alergias.length; i++){
            try {
                var deleted = await AlergiaService.deleteAlergia(historialClinico.docs[0].alergias[i]);
                //res.status(200).send("Succesfully Deleted Alergia... ");
            } catch (e) {
                return res.status(400).json({status: 400, message: e.message})
            }
        }
    }

    //Eliminar comentarios
    if(historialClinico.docs[0].comentarios != undefined){
        for(var i = 0; i < historialClinico.docs[0].comentarios.length; i++){
            try {
                var deleted = await ComentarioService.deleteComentario(historialClinico.docs[0].comentarios[i]);
                //res.status(200).send("Succesfully Deleted Comentario... ");
            } catch (e) {
                return res.status(400).json({status: 400, message: e.message})
            }
        }
    }
    //Eliminar enfermedades
    if(historialClinico.docs[0].enfermedades != undefined){
        for(var i = 0; i < historialClinico.docs[0].enfermedades.length; i++){
            try {
                var deleted = await EnfermedadService.deleteEnfermedad(historialClinico.docs[0].enfermedades[i]);
                //res.status(200).send("Succesfully Deleted Enfermedad... ");
            } catch (e) {
                return res.status(400).json({status: 400, message: e.message})
            }
        }
    }
    //Eliminar estudios
    if(historialClinico.docs[0].estudios != undefined){
        for(var i = 0; i < historialClinico.docs[0].estudios.length; i++){
            try {
                var deleted = await EstudioService.deleteEstudio(historialClinico.docs[0].estudios[i]);
                //res.status(200).send("Succesfully Deleted Estudio... ");
            } catch (e) {
                return res.status(400).json({status: 400, message: e.message})
            }
        }
    }
    //Eliminar internaciones
    if(historialClinico.docs[0].internaciones != undefined){
        for(var i = 0; i < historialClinico.docs[0].internaciones.length; i++){
            try {
                var deleted = await InternacionService.deleteInternacion(historialClinico.docs[0].internaciones[i]);
                //res.status(200).send("Succesfully Deleted Internacion... ");
            } catch (e) {
                return res.status(400).json({status: 400, message: e.message})
            }
        }
    }
    
    //Eliminar medicamentos
   if(historialClinico.docs[0].medicamentos != undefined){
        for(var i = 0; i < historialClinico.docs[0].medicamentos.length; i++){
            try {
                var deleted = await MedicamentoService.deleteMedicamento(historialClinico.docs[0].medicamentos[i]);
                //res.status(200).send("Succesfully Deleted Medicamento... ");
            } catch (e) {
                return res.status(400).json({status: 400, message: e.message})
            }
        }
    }

    //Eliminar historial clinico
    try {
        var deleted = await HistorialClinicoService.deleteHistorialClinico(id);
       // res.status(200).send("Succesfully Deleted Historial Clinico... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
    
    
