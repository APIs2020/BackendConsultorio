// Gettign the Newly created Mongoose Model we just created 
var Estudio = require('../models/Estudio.model');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getEstudios = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var estudios = await Estudio.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return estudios;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Estudios');
    }
}

exports.createEstudio = async function (estudio) {

    // Creating a new Mongoose Object by using the new keyword
    if(estudio == null){
        var newEstudio = new Estudio({
            fechaPedido:"",
            fechaRealizado:"",
            tipo:"",
            descripcion:"",
            resultado:"",
        })
    } else {
        var newEstudio = new Estudio({
            fechaPedido:estudio.fechaPedido,
            fechaRealizado:estudio.fechaRealizado,
            tipo:estudio.tipo,
            descripcion:estudio.descripcion,
            resultado:estudio.resultado
        })
    }

    try {
        // Saving the Estudio 
        var savedEstudio = await newEstudio.save();
        var token = jwt.sign({
            id: savedEstudio._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedEstudio._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Estudio")
    }
}

exports.updateEstudio = async function (estudio) {
    var id = estudio.id
    try {
        //Find the old User Object by the Id
        var oldEstudio = await estudio.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Estudio")
    }
    // If no old Estudio Object exists return false
    if (!oldEstudio) {
        return false;
    }
    //Edit the Estudio Object
    oldEstudio.fechaPedido = estudio.fechaPedido
    oldEstudio.fechaRealizado = estudio.fechaRealizado
    oldEstudio.tipo = estudio.tipo
    oldEstudio.descripcion = estudio.descripcion
    oldEstudio.resultado = estudio.resultado
    try {
        var savedEstudio = await oldEstudio.save()
        return savedEstudio;
    } catch (e) {
        throw Error("And Error occured while updating the Estudio");
    }
}

exports.deleteEstudio = async function (id) {

    // Delete the User
    try {
        var deleted = await Estudio.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Estudio Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Estudio")
    }
}