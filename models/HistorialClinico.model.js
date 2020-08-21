var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Enfermedades = require('./Enfermedades.model')
var Comentarios = require('./Comentarios.model')
var Estudios = require('./Estudios.model')
var Internaciones = require('./Internaciones.model')
var Medicamentos = require('./Medicamento.model')
var Alergias = require('./Alergias.model')

var HistorialClinicoSchema = new mongoose.Schema({
    peso: String,
    altura:String,
    grupoSan:String,
    fechaInicio:Date,
    /*enfermedadesHereditarias:[Enfermedades],
    estudios:[Estudios],
    internaciones:[Internaciones],
    medicamentos:[Medicamentos],
    alergias:[Alergias],*/
    comentarios:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Comentarios
        }
    ]

})

HistorialClinicoSchema.plugin(mongoosePaginate);
const HistorialClinico = mongoose.model('HistoriaClinica', HistorialClinicoSchema);

module.exports = HistorialClinico;