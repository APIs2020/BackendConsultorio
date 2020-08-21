// Gettign the Newly created Mongoose Model we just created 
var HistorialClinico = require('../models/HistorialClinico.model');
var ComentarioService = require('./comentarios.service');
var bcrypt = require('bcryptjs');
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
        var HistCli = await HistCli.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return HistCli;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Historia Clinica');
    }
}

exports.createHistClinica = async function (HistorialClinico) {

    //create doc 'comentarios'
    var comentarios = await ComentarioService.createComentario();

    // Creating a new Mongoose Object by using the new keyword
    if(HistorialClinico == null){
        var newHistCli = new HistorialClinico({
            peso: "",
            altura: "", 
            fechaNac: "",
            grupoSan: "",
            fechaInicio: "",
            comentarios: comentarios
        })

    } else {
        var newHistCli = new HistorialClinico({
            peso:HistorialClinico.peso,
            altura:HistorialClinico.altura, 
            fechaNac:HistorialClinico.fechaNac,
            grupoSan:HistorialClinico.grupoSan,
            fechaInicio:HistorialClinico.fechaInicio
        })
    }

    try {

        console.log("OBJECT ID NEW HISTORIAL CLINICO", newHistCli.ObjectId);
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
