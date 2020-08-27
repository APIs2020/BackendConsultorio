// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Users = await User.paginate(query, options)
        // Return the Userd list that was returned by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUser = new User({
        name: user.name,
        apellido : user.apellido,
        email: user.email,
        fechaNacimiento: user.fechaNacimiento,
        password: hashedPassword,
        dni:user.dni,
        pisoDepto:user.pisoDepto,
        telefono:user.telefono,
        domicilio:user.domicilio,
        tipo: user.tipo,
        historialClinico: user.historialClinico
    })
    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        var createdUser = {
            token:token,
            user: savedUser
        }

        return createdUser;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    var id = user.id
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    oldUser.name = user.name ? user.name : oldUser.name
    oldUser.apellido = user.apellido ? user.apellido : oldUser.apellido
    oldUser.email = user.email ? user.email : oldUser.email
    oldUser.password = user.password ? user.password : oldUser.password
    oldUser.dni = user.dni ? user.dni : oldUser.dni
    oldUser.fechaNacimiento = user.fechaNacimiento ? user.fechaNacimiento : oldUser.fechaNacimiento
    oldUser.pisoDepto = user.pisoDepto ? user.pisoDepto : oldUser.pisoDepto
    oldUser.telefono = user.telefono ? user.telefono : oldUser.telefono
    oldUser.domicilio = user.domicilio ? user.domicilio : oldUser.domicilio
    oldUser.tipo = user.tipo ? user.tipo : oldUser.tipo
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        var _details = await User.findOne(
            {
                dni: user.dni
            },
        );
        if(_details == null) throw Error("No existe el usuario")
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid dni/password")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        var loginUser = {
            token: token,
            user : _details
        }
        return loginUser;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }
}