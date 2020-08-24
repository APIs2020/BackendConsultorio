// Gettign the Newly created Mongoose Model we just created 
var Receta = require('../models/Receta.model');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getRecetas = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var recetas = await Recetas.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return recetas;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Recetas');
    }
}

exports.createReceta = async function (receta) {

    // Creating a new Mongoose Object by using the new keyword
    if(receta == null){
        var newReceta = new Receta({
            nombrePaciente: "",
            numSocio: 0,
            dni: 0,
            fecha: "",
            descripcion: "",
            receta: ""
        })
    } else {
        var newReceta = new Receta({
            nombrePaciente: receta.nombrePaciente,
            numSocio: receta.numSocio,
            dni: receta.dni,
            fecha: receta.fecha,
            descripcion: receta.descripcion,
            receta: receta.receta
        })
    }

    try {
        // Saving the Receta 
        var savedReceta = await newReceta.save();
        var token = jwt.sign({
            id: savedReceta._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedReceta._id;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Receta")
    }
}

/*exports.updateMedicamento = async function (medicamento) {
    var id = medicamento.id
    try {
        //Find the old User Object by the Id
        var oldMedicamento = await Medicamento.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Medicamento")
    }
    // If no old Medicamento Object exists return false
    if (!oldMedicamento) {
        return false;
    }
    //Edit the Medicamento Object
    oldMedicamento.fechaRecetado = medicamento.fechaRecetado ? medicamento.fechaRecetado : oldMedicamento.fechaRecetado
    oldMedicamento.fechaTerminado = medicamento.fechaTerminado ? medicamento.fechaTerminado : oldMedicamento.fechaTerminado
    oldMedicamento.nombre = medicamento.nombre ? medicamento.nombre : oldMedicamento.nombre
    oldMedicamento.droga = medicamento.droga ? medicamento.droga : oldMedicamento.droga
    oldMedicamento.dosis = medicamento.dosis ? medicamento.dosis : oldMedicamento.dosis
    oldMedicamento.frecuencia = medicamento.frecuencia ? medicamento.frecuencia : oldMedicamento.frecuencia

    try {
        var savedMedicamento = await oldMedicamento.save()
        return savedMedicamento;
    } catch (e) {
        throw Error("And Error occured while updating the Medicamento");
    }
}*/

exports.deleteReceta = async function (id) {

    // Delete the User
    try {
        var deleted = await Receta.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Receta Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Receta")
    }
}