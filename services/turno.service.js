// Gettign the Newly created Mongoose Model we just created 
var Turno = require('../models/Turnos.model');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getTurnos = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var turnos = await Turnos.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return turnos;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Turnos');
    }
}

exports.createTurno = async function (turno) {

    // Creating a new Mongoose Object by using the new keyword
    if(turno == null){
        var newTurno = new Turno({
            nombrePaciente: "",
            especialidad: "",
            fecha: "",
            dni: 0,
            profesional: "",
            sucursal: ""
        })
    } else {
        var newTurno = new Turno({
            nombrePaciente: turno.nombrePaciente,
            especialidad: turno.especialidad,
            fecha: turno.fecha,
            dni: turno.dni,
            profesional: turno.profesional,
            sucursal: turno.sucursal
        })
    }

    try {
        // Saving the Turno 
        var savedTurno = await newTurno.save();
        var token = jwt.sign({
            id: savedTurno._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedTurno._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Turno")
    }
}

exports.deleteTurno = async function (id) {

    // Delete the User
    try {
        var deleted = await Turno.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Turno Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Turno")
    }
}