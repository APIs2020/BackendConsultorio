var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var AlergiasSchema = new mongoose.Schema({
    fechaDiagnostico:Date,
    tipo:String,
    descripcion:String,
})

AlergiasSchema.plugin(mongoosePaginate)