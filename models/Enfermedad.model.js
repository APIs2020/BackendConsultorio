var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EnfermedadSchema = new mongoose.Schema({
    tipo:String,
    nombre: String,
    sintomas: String,
    fechaDiagnostico: Date,
    fechaAlta: Date
})

EnfermedadSchema.plugin(mongoosePaginate)

const Enfermedad = mongoose.model('Enfermedad', EnfermedadSchema);

module.exports = Enfermedad;