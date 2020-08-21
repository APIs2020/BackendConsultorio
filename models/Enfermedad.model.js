var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EnfermedadesSchema = new mongoose.Schema({
    tipo:String,
    nombre: String,
    sintomas: String,
    fechaDiagnostico: Date,
    fechaAlta: Date
})

EnfermedadesSchema.plugin(mongoosePaginate)