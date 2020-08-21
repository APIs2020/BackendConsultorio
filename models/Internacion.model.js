var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var InternacionSchema = new mongoose.Schema({
    fechaIngreso: Date,
    fechaEgreso: Date,
    diagnostico: String,
    habitacion: String
})

InternacionSchema.plugin(mongoosePaginate)

const Internacion = mongoose.model('Internacion', InternacionSchema);

module.exports = Internacion;