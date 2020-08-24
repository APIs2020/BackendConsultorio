var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var DispTurnoSchema = new mongoose.Schema({
    profesional:String,
    turnos:[Date]
});

DispTurnoSchema.plugin(mongoosePaginate)

const DispTurno = mongoose.model('DispTurno', DispTurnoSchema);

module.exports = DispTurno;