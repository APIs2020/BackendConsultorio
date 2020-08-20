var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var MedicamentosSchema = new mongoose.Schema({
    fechaRecetado:Date,
    fechaTerminado:Date,
    nombre:String,
    droga:String,
    dosis:String,
    frecuencia:String,
})

MedicamentosSchema.plugin(mongoosePaginate)