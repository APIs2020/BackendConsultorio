// Gettign the Newly created Mongoose Model we just created 
var HistClinica = require('../models/HistClinica.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Historia Clinica List
exports.getHistClinicas = async function (query, page, limit) {

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

exports.createHistClinica = async function (HistClinica) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(HistCli.password, 8);
    var newHistCli = new HistCli({
        peso:HistCli.peso,
        altura:HistCli.altura,
        fechaNac:HistCli.fechaNac,
        grupoSan:HistCli.grupoSan,
        fechaInicio:HistCli.fechaInicio
        //histCli:user.histCli
    })

    try {
        // Saving the Historia Clinica 
        var savedHistCli = await newHistCli.save();
        var token = jwt.sign({
            id: savedHistCli._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
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
