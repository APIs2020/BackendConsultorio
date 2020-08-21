var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var AlergiaSchema = new mongoose.Schema({
    fechaDiagnostico:Date,
    tipo:String,
    descripcion:String,
})

AlergiaSchema.plugin(mongoosePaginate)


const Alergia = mongoose.model('Alergia', AlergiaSchema);

module.exports = Alergia;