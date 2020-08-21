var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EstudiosSchema = new mongoose.Schema({
    fechaPedido:Date,
    fechaRealizado:Date,
    tipo:String,
    descripcion:String,
    resultado:String
})

EstudiosSchema.plugin(mongoosePaginate)