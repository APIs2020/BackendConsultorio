var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var EstudioSchema = new mongoose.Schema({
    fechaPedido:Date,
    fechaRealizado:Date,
    tipo:String,
    descripcion:String,
    resultado:String
})

EstudioSchema.plugin(mongoosePaginate)


const Estudio = mongoose.model('Estudio', EstudioSchema);

module.exports = Estudio;