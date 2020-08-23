var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var HistorialClinicoController = require('../../controllers/historialesClinicos.controller');
var ComentarioController = require('../../controllers/comentarios.controller');
var EnfermedadController = require('../../controllers/enfermedades.controller');
var AlergiaController = require('../../controllers/alergias.controller');
var MedicamentoController = require('../../controllers/medicamentos.controller');
var EstudioController = require('../../controllers/estudios.controller');
var InternacionController = require('../../controllers/internaciones.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/user.routes');
  });
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/', Authorization, UserController.getUsers)
router.put('/', Authorization, UserController.updateUser)
router.put('/modificarHistorialClinico', Authorization, HistorialClinicoController.updateHistorialClinico)
router.delete('/modificarHistorialClinico', Authorization, HistorialClinicoController.removeHistorialClinico)
router.put('/comentario', Authorization, InternacionController.updateInternacion)
router.delete('/:id', Authorization, UserController.removeUser)
router.post('/historialClinico',Authorization, HistorialClinicoController.getHistorialClinicoByUser)

// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login