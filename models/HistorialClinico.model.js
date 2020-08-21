var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Enfermedades = require('./Enfermedad.model')
var Comentario = require('./Comentario.model')
var Estudios = require('./Estudio.model')
var Internaciones = require('./Internacion.model')
var Medicamentos = require('./Medicamento.model')
var Alergias = require('./Alergia.model')

var HistorialClinicoSchema = new mongoose.Schema({
    peso: String,
    altura:String,
    grupoSan:String,
    fechaInicio:Date,
    enfermedadesHereditarias:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Enfermedades
        }
    ],
    enfermedadesNoHereditarias:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Enfermedades
        }
    ],
    estudios:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Estudios
        }
    ],
    internaciones:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Internaciones
        }
    ],
    medicamentos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Medicamentos
        }
    ],
    alergias:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Alergias
        }
    ],
    comentarios:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Comentario
        }
    ]

})

HistorialClinicoSchema.plugin(mongoosePaginate);
const HistorialClinico = mongoose.model('HistorialClinico', HistorialClinicoSchema);

module.exports = HistorialClinico;