// Gettign the Newly created Mongoose Model we just created 
var DispTurno = require('../models/DispTurnos.model');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getDispTurnos = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var dispTurnos = await DispTurnos.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return dispTurnos;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating DispTurnos');
    }
}

exports.createDispTurno = async function (dispTurno) {

    // Creating a new Mongoose Object by using the new keyword
    if(dispTurno == null){
        var newDispTurno = new DispTurno({
            profesional: "",
            fecha: ""
        })
    } else {
        var newDispTurno = new DispTurno({
            profesional: dispTurno.profesional,
            fecha: dispTurno.fecha
        })
    }

    try {
        // Saving the Turno 
        var savedDispTurno = await newDispTurno.save();
        var token = jwt.sign({
            id: savedDispTurno._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedDispTurno._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating DispTurno")
    }
}

exports.deleteDispTurno = async function (id) {

    // Delete the User
    try {
        var deleted = await DispTurno.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("DispTurno Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the DispTurno")
    }
}