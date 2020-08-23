// Gettign the Newly created Mongoose Model we just created 
var Enfermedad = require('../models/Enfermedad.model');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getEnfermedades = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Enfermedades = await Enfermedad.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Enfermedades;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Enfermedads');
    }
}

exports.createEnfermedad = async function (enfermedad) {

    // Creating a new Mongoose Object by using the new keyword
    if(enfermedad == null){
        var newEnfermedad = new Enfermedad({
            tipo:"",
            nombre: "",
            sintomas: "",
            fechaDiagnostico: "",
            fechaAlta: "" 
        })
    } else {
        var newEnfermedad = new Enfermedad({
            tipo:enfermedad.tipo,
            nombre:enfermedad.nombre,
            sintomas: enfermedad.sintomas,
            fechaDiagnostico: enfermedad.fechaDiagnostico,
            fechaAlta: enfermedad.fechaAlta
        })
    }
    
    try {
        // Saving the Enfermedad 
        var savedEnfermedad = await newEnfermedad.save();
        var token = jwt.sign({
            id: savedEnfermedad._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedEnfermedad._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Enfermedad")
    }
}

exports.updateEnfermedad = async function (enfermedad) {
    var id = enfermedad.id
    try {
        //Find the old User Object by the Id
        var oldEnfermedad = await Enfermedad.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Enfermedad")
    }
    // If no old Enfermedad Object exists return false
    if (!oldEnfermedad) {
        return false;
    }
    //Edit the Enfermedad Object
    oldEnfermedad.tipo = enfermedad.tipo ? enfermedad.tipo : oldEnfermedad.tipo
    oldEnfermedad.nombre = enfermedad.nombre ? enfermedad.nombre : oldEnfermedad.nombre
    oldEnfermedad.sintomas = enfermedad.sintomas ? enfermedad.sintomas : oldEnfermedad.sintomas
    oldEnfermedad.fechaDiagnostico = enfermedad.fechaDiagnostico ? enfermedad.fechaDiagnostico : oldEnfermedad.fechaDiagnostico
    oldEnfermedad.fechaAlta = enfermedad.fechaAlta ? enfermedad.fechaAlta : oldEnfermedad.fechaAlta
    try {
        var savedEnfermedad = await oldEnfermedad.save()
        return savedEnfermedad;
    } catch (e) {
        throw Error("And Error occured while updating the Enfermedad");
    }
}

exports.deleteEnfermedad = async function (id) {

    // Delete the User
    try {
        var deleted = await Enfermedad.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Enfermedad Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Enfermedad")
    }
}