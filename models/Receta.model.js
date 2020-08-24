var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var RecetaSchema = new mongoose.Schema({
    nombrePaciente:String,
    numSocio:Number,
    dni:Number,
    fecha:Date,
    descripcion:String,
    receta:String
});

RecetaSchema.plugin(mongoosePaginate)

const Receta = mongoose.model('Receta', RecetaSchema);

module.exports = Receta;