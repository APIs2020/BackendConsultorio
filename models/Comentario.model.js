var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ComentarioSchema = new mongoose.Schema({
    fecha: Date,
    descripcion: String
})

ComentarioSchema.plugin(mongoosePaginate)

const Comentario = mongoose.model('Comentario', ComentarioSchema);

module.exports = Comentario;