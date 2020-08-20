var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var InternacionesSchema = new mongoose.Schema({
    fechaIngreso: Date,
    fechaEgreso: Date,
    diagnostico: String,
    habitacion: String
})

InternacionesSchema.plugin(mongoosePaginate)