// Gettign the Newly created Mongoose Model we just created 
var Internacion = require('../models/Internacion.model');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getInternaciones = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Internaciones = await Internacion.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Internaciones;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Internacions');
    }
}

exports.createInternacion = async function (internacion) {

    // Creating a new Mongoose Object by using the new keyword
    if(internacion == null){
        var newInternacion = new Internacion({
            fechaIngreso: "",
            fechaEgreso: "",
            diagnostico: "",
            habitacion: ""
        })
    } else {
        var newInternacion = new Internacion({
            fechaIngreso: internacion.fechaEgreso,
            fechaEgreso: internacion.fechaEgreso,
            diagnostico: internacion.diagnostico,
            habitacion: internacion.habitacion
        })
    }

    try {
        // Saving the Internacion 
        var savedInternacion = await newInternacion.save();
        var token = jwt.sign({
            id: savedInternacion._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedInternacion._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Internacion")
    }
}

exports.updateInternacion = async function (internacion) {
    var id = internacion.id
    try {
        //Find the old User Object by the Id
        var oldInternacion = await Internacion.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Internacion")
    }
    // If no old Internacion Object exists return false
    if (!oldInternacion) {
        return false;
    }
    //Edit the Internacion Object
    oldInternacion.fechaIngreso = internacion.fechaIngreso ? internacion.fechaIngreso : oldInternacion.fechaIngreso
    oldInternacion.fechaEgreso = internacion.fechaEgreso ? internacion.fechaEgreso : oldInternacion.fechaEgreso
    oldInternacion.diagnostico = internacion.diagnostico ? internacion.diagnostico : oldInternacion.diagnostico
    oldInternacion.habitacion = internacion.habitacion ? internacion.habitacion : oldInternacion.habitacion
    try {
        var savedInternacion = await oldInternacion.save()
        return savedInternacion;
    } catch (e) {
        throw Error("And Error occured while updating the Internacion");
    }
}

exports.deleteInternacion = async function (id) {

    // Delete the User
    try {
        var deleted = await Internacion.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Internacion Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Internacion")
    }
}