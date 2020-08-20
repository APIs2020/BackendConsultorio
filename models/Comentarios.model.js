var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ComentariosSchema = new mongoose.Schema({
    fecha: Date,
    descripcion: String
})

ComentariosSchema.plugin(mongoosePaginate)