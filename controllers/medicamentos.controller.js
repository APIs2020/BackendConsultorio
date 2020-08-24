var MedicamentoService = require('../services/medicamento.service');
var HistorialClinicoService = require('../services/historialClinico.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getMedicamentos = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Medicamentos = await MedicamentoService.getMedicamentos({}, page, limit)
        // Return the Medicamentos list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Medicamentos, message: "Succesfully Medicamentos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createMedicamento = async function (req, res, next) {

    

    // Req.Body contains the form submit values.

    var Medicamento = {
        fechaRecetado:req.body.fechaRecetado,
        fechaTerminado:req.body.fechaTerminado,
        nombre:req.body.nombre,
        droga:req.body.droga,
        dosis:req.body.dosis,
        frecuencia:req.body.frecuencia,
        
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdMedicamento = await MedicamentoService.createMedicamento(Medicamento)
        return res.status(201).json({token: createdMedicamento, message: "Succesfully Created Medicamento"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Medicamento Creation was Unsuccesfull"})
    }
}

exports.updateMedicamento = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var Medicamento = {
        id,
        fechaRecetado:req.body.fechaRecetado ? req.body.fechaRecetado : null,
        fechaTerminado:req.body.fechaTerminado ? req.body.fechaTerminado : null,
        nombre:req.body.nombre ? req.body.nombre : null,
        droga:req.body.droga ? req.body.droga : null,
        dosis:req.body.dosis ? req.body.dosis: null,
        frecuencia:req.body.frecuencia ? req.body.frecuencia : null,
    }
    try {
        var updatedMedicamento = await MedicamentoService.updateMedicamento(Medicamento)
        return res.status(200).json({status: 200, data: updatedMedicamento, message: "Succesfully Updated Medicamento"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeMedicamento = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await MedicamentoService.deleteMedicamento(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
    
    
