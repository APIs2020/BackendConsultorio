// Gettign the Newly created Mongoose Model we just created 
var Alergia = require('../models/Alergia.model');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getAlergias = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var alergias = await Alergia.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return alergias;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Alergias');
    }
}

exports.createAlergia = async function (alergia) {

    // Creating a new Mongoose Object by using the new keyword
    if(alergia == undefined){
        var newAlergia = new Alergia({
            fechaDiagnostico:"",
            tipo: "",
            descripcion:""
        })
    } else {
        var newAlergia = new Alergia({
            fechaDiagnostico: alergia.fechaDiagnostico,
            tipo: alergia.tipo,
            descripcion: alergia.descripcion
        })
    }

    try {
        // Saving the Alergio 
        var savedAlergia = await newAlergia.save();
        var token = jwt.sign({
            id: savedAlergia._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedAlergia._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating alergia")
    }
}

exports.updatealergia = async function (alergia) {
    var id = alergia.id
    try {
        //Find the old User Object by the Id
        var oldAlergia = await alergia.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the alergia")
    }
    // If no old alergia Object exists return false
    if (!oldAlergia) {
        return false;
    }
    //Edit the alergia Object
    oldAlergia.fechaDiagnostico = alergia.fechaDiagnostico
    oldAlergia.tipo = alergia.tipo
    oldAlergia.descripcion = alergia.descripcion
    try {
        var savedAlergia = await oldAlergia.save()
        return savedAlergia;
    } catch (e) {
        throw Error("And Error occured while updating the alergia");
    }
}

exports.deleteAlergia = async function (id) {

    // Delete the User
    try {
        var deleted = await alergia.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("alergia Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the alergia")
    }
}