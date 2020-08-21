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

    console.log("QUERY HISTORIAL", query)
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

exports.createHistClinica = async function (historialClinico) {

    //create doc 'comentarios'
    var comentarios = [];
    for(var i = 0; i < historialClinico.comentarios.length; i++) {
        var obj = historialClinico.comentarios[i];
        var comentario = await ComentarioService.createComentario(obj);
        comentarios.push(comentario);
    }

    //create doc 'medicamentos'

    var medicamentos = [];
    for(var i = 0; i < historialClinico.medicamentos.length; i++) {
        var obj = historialClinico.medicamentos[i];
        var medicamento = await MedicamentoService.createMedicamento(obj);
        medicamentos.push(medicamento);
    }
    
    //create doc 'estudios'

    var estudios = [];
    for(var i = 0; i < historialClinico.estudios.length; i++) {
        var obj = historialClinico.estudios[i];
        var estudio = await EstudioService.createEstudio(obj);
        estudios.push(estudio);
    }

    //create doc 'alergias'

   if(historialClinico.alergias != undefined){
    var alergias = [];
    for(var i = 0; i < historialClinico.alergias.length; i++) {
        var obj = historialClinico.alergias[i];
        var alergia = await AlergiaService.createAlergia(obj);
        alergias.push(alergia);
    }

   }
    //create doc 'enfermedades'
    
    var enfermedades = [];
    for(var i = 0; i < historialClinico.enfermedades.length; i++) {
        var obj = historialClinico.enfermedades[i];
        var enfermedad = await EnfermedadService.createEnfermedad(obj);
        enfermedades.push(enfermedad);
    }

    //create doc 'internaciones'

    var internaciones = [];
    for(var i = 0; i < historialClinico.internaciones.length; i++) {
        var obj = historialClinico.internaciones[i];
        var internacion = await InternacionService.createInternacion(obj);
        internaciones.push(internacion);
    }

    

    // Creating a new Mongoose Object by using the new keyword
    if(historialClinico == null){
        var newHistCli = new HistorialClinico({
            peso: "",
            altura: "", 
            fechaNac: "",
            grupoSan: "",
            fechaInicio: "",
            comentarios: "",
            estudios:"",
            enfermedades:"",
            alergias:"",
            medicamentos:"",
            internaciones:"",
        })

    } else {
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

exports.updateHistClinica = async function (histClinica) {
    var id = histClinica.id
    try {
        //Find the old Historia Clinica Object by the Id
        var oldHistClinica = await histClinica.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Historia Clinica")
    }
    // If no old Historia Clinica Object exists return false
    if (!oldHistClinica) {
        return false;
    }
    //Edit the Historia Clinica Object
    oldHistClinica.peso = histClinica.name
    oldHistClinica.altura = histClinica.email
    oldHistClinica.fechaNac = histClinica.password
    try {
        var savedHistCli = await oldHistClinica.save()
        return savedHistClinica;
    } catch (e) {
        throw Error("And Error occured while updating the Historia Clinica");
    }
}

exports.deleteHistClinica = async function (id) {

    // Delete the Historia Clinica
    try {
        var deleted = await histClinica.remove({
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
