var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var TurnoSchema = new mongoose.Schema({
    nombrePaciente:String,
    especialidad:String,
    fecha:Date,
    dni:Number,
    profesional:String,
    sucursal:String
});

TurnoSchema.plugin(mongoosePaginate)

const Turno = mongoose.model('Turno', TurnoSchema);

module.exports = Turno;