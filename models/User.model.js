var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var HistorialClinico = require('./HistorialClinico.model')


var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    dni: String,
    fechaNacimiento: Date,
    pisoDepto: String,
    password: String,
    telefono:String,
    domicilio:String,
    historialClinico: [{
        type:mongoose.Schema.Types.ObjectId,    
        ref:HistorialClinico,
    }]
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;