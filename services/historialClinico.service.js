// Gettign the Newly created Mongoose Model we just created 
var HistorialClinico = require('../models/HistorialClinico.model');
var ComentarioService = require('./comentario.service');
var EstudioService = require('./estudio.service');
var EnfermedadService = require('./enfermedad.service');
var AlergiaService = require('./alergia.service');
var InternacionService = require('./internacion.service');
var MedicamentoService = require('./medicamento.service');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Historia Clinica List
exports.getHistorialesClinicos = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 
    try {
        var historialClinico = await HistorialClinico.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return historialClinico;
        
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Historia Clinica');
    }
}

exports.createHistorialClinico = async function (historialClinico) {

    console.log("HISTORIAL CLINICO", historialClinico)

    // Creating a new Mongoose Object by using the new keyword
    if(historialClinico == undefined){
        console.log("ENTRE UNDEFINED")
        var newHistCli = new HistorialClinico({
            peso: "",
            altura: "", 
            fechaNac: "",
            grupoSan: "",
            fechaInicio: "",
            comentarios: [],
            estudios:[],
            enfermedades:[],
            alergias:[],
            medicamentos:[],
            internaciones:[],
        })

    } else {

    //create doc 'comentarios'
    var comentarios = [];
    if(historialClinico.comentarios != undefined){
        
        for(var i = 0; i < historialClinico.comentarios.length; i++) {
            var obj = historialClinico.comentarios[i];
            var comentario = await ComentarioService.createComentario(obj);
            comentarios.push(comentario);
        }
    }

    //create doc 'medicamentos'
    var medicamentos = [];
    if(historialClinico.medicamentos != undefined){
        
        for(var i = 0; i < historialClinico.medicamentos.length; i++) {
            var obj = historialClinico.medicamentos[i];
            var medicamento = await MedicamentoService.createMedicamento(obj);
            medicamentos.push(medicamento);
        }
    }   
    
    //create doc 'estudios'
    var estudios = [];
    if(historialClinico.estudios != undefined){
        
        for(var i = 0; i < historialClinico.estudios.length; i++) {
            var obj = historialClinico.estudios[i];
            var estudio = await EstudioService.createEstudio(obj);
            estudios.push(estudio);
        }
    }
    //create doc 'alergias'
    var alergias = [];
    if(historialClinico.alergias != undefined){
    
    for(var i = 0; i < historialClinico.alergias.length; i++) {
        var obj = historialClinico.alergias[i];
        var alergia = await AlergiaService.createAlergia(obj);
        alergias.push(alergia);
    }

   }
    //create doc 'enfermedades'
    var enfermedades = [];
    if(historialClinico.enfermedades != undefined){
        
        for(var i = 0; i < historialClinico.enfermedades.length; i++) {
            var obj = historialClinico.enfermedades[i];
            var enfermedad = await EnfermedadService.createEnfermedad(obj);
            enfermedades.push(enfermedad);
        }
    }

    //create doc 'internaciones'
    var internaciones = [];
    if(historialClinico.internaciones != undefined){
        
        for(var i = 0; i < historialClinico.internaciones.length; i++) {
            var obj = historialClinico.internaciones[i];
            var internacion = await InternacionService.createInternacion(obj);
            internaciones.push(internacion);
        }
    }
        console.log("ENTRE NORMAL")
        var newHistCli = new HistorialClinico({
            peso:historialClinico.peso,
            altura:historialClinico.altura, 
            fechaNac:historialClinico.fechaNac,
            grupoSan:historialClinico.grupoSan,
            fechaInicio:historialClinico.fechaInicio,
            comentarios: comentarios,
            estudios: estudios,
            enfermedades: enfermedades,
            alergias:alergias,
            medicamentos:medicamentos,
            internaciones:internaciones
        })
    }

    try {

        //console.log("OBJECT ID NEW HISTORIAL CLINICO", newHistCli.ObjectId);
        // Saving the Historia Clinica 
        var savedHistCli = await newHistCli.save();
        var token = jwt.sign({
            id: savedHistCli._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedHistCli._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Historia Clinica")
    }
}

exports.updateHistorialClinico = async function (historialClinico) {
    var id = historialClinico.id

    console.log("ID",id);
    try {
        //Find the old Historia Clinica Object by the Id
        var oldHistorialClinico = await HistorialClinico.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Historia Clinica")
    }
    // If no old Historia Clinica Object exists return false
    if (!oldHistorialClinico) {
        return false;
    }
    //Edit the Historia Clinica Object
    oldHistorialClinico.peso = historialClinico.peso ? historialClinico.peso : oldHistorialClinico.peso
    oldHistorialClinico.altura = historialClinico.altura ? historialClinico.altura : oldHistorialClinico.altura
    oldHistorialClinico.fechaNacimiento = historialClinico.fechaNacimiento ? historialClinico.fechaNacimiento : oldHistorialClinico.fechaNacimiento
    //update comentarios
    if(historialClinico.comentarios != null){
        for(var i = 0; i < historialClinico.comentarios.length; i++) {
            var obj = historialClinico.comentarios[i];
            var comentario = await ComentarioService.createComentario(obj);
            oldHistorialClinico.comentarios.push(comentario);
        }
    }
    //update enfermedades
    if(historialClinico.enfermedades != null){
        for(var i = 0; i < historialClinico.enfermedades.length; i++) {
            var obj = historialClinico.comentarios[i];
            var enfermedad = await EnfermedadService.createEnfermedad(obj);
            oldHistorialClinico.enfermedades.push(enfermedad);
        }
    }
    //update alergias
    if(historialClinico.alergias != null){
        for(var i = 0; i < historialClinico.alergias.length; i++) {
            var obj = historialClinico.alergias[i];
            var alergia = await AlergiaService.createAlergia(obj);
            oldHistorialClinico.alergias.push(alergia);
        }
    }
    //update medicamentos
    if(historialClinico.medicamentos != null){
        for(var i = 0; i < historialClinico.medicamentos.length; i++) {
            var obj = historialClinico.medicamentos[i];
            var medicamento = await MedicamentoService.createMedicamento(obj);
            oldHistorialClinico.medicamentos.push(medicamento);
        }
    }
    //update internaciones
    if(historialClinico.internaciones != null){
        for(var i = 0; i < historialClinico.internaciones.length; i++) {
            var obj = historialClinico.internaciones[i];
            var internacion = await InternacionService.createInternacion(obj);
            oldHistorialClinico.internaciones.push(internacion);
        }
    }

    try {
        var savedHistorialClinico = await oldHistorialClinico.save()
        return savedHistorialClinico;
    } catch (e) {
        throw Error("And Error occured while updating the Historia Clinica");
    }
}

exports.deleteHistorialClinico = async function (id) {

    // Delete the Historia Clinica
    try {
        var deleted = await HistorialClinico.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Historia Clinica Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Historia Clinica")
    }

}
