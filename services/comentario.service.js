// Gettign the Newly created Mongoose Model we just created 
var Comentario = require('../models/Comentario.model');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getComentarios = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Comentarios = await Comentario.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Comentarios;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Comentarios');
    }
}

exports.createComentario = async function (comentario) {

    // Creating a new Mongoose Object by using the new keyword
    if(comentario == null){
        var newComentario = new Comentario({
            fecha:"",
            descripcion:""
        })
    } else {
        var newComentario = new Comentario({
            fecha: comentario.fecha,
            descripcion:comentario.descripcion
        })
    }

    try {
        // Saving the Comentario 
        var savedComentario = await newComentario.save();
        var token = jwt.sign({
            id: savedComentario._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedComentario._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Comentario")
    }
}

exports.updateComentario = async function (comentario) {
    var id = comentario.id
    try {
        //Find the old User Object by the Id
        var oldComentario = await Comentario.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Comentario")
    }
    // If no old Comentario Object exists return false
    if (!oldComentario) {
        return false;
    }
    //Edit the Comentario Object
    oldComentario.fecha = comentario.fecha
    oldComentario.descripcion = comentario.descripcion
    try {
        var savedComentario = await oldComentario.save()
        return savedComentario;
    } catch (e) {
        throw Error("And Error occured while updating the Comentario");
    }
}

exports.deleteComentario = async function (id) {

    // Delete the User
    try {
        var deleted = await Comentario.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Comentario Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Comentario")
    }
}