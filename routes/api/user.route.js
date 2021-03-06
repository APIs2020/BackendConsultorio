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
var RecetasController = require('../../controllers/recetas.controller');
var TurnosController = require('../../controllers/turnos.controller');
var DispTurnosController = require('../../controllers/dispTurnos.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/user.routes');
  });
router.post('/registration', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/', Authorization, UserController.getUsers)
router.post('/getByEspecialidad', Authorization, UserController.getUsersByEspecialidad)
router.post('/getUserByDNI', Authorization, UserController.getUsersByDNI)
router.put('/', Authorization, UserController.updateUser)
router.delete('/:id', Authorization, UserController.removeUser)

router.put('/modificarHistorialClinico', Authorization, HistorialClinicoController.updateHistorialClinico)
router.post('/historialClinico/getHistoriaClinicaByID',Authorization, HistorialClinicoController.getHistoriaClinicaByID)

router.post('/comentario/getComentarioByID',Authorization, ComentarioController.getComentarioByID)
router.put('/comentario', Authorization, ComentarioController.updateComentario)

router.post('/alergia/getAlergiaByID',Authorization, AlergiaController.getAlergiaByID)
router.put('/alergia', Authorization, AlergiaController.updateAlergia)

router.post('/estudio/getEstudioByID',Authorization,EstudioController.getEstudioByID)
router.put('/estudio', Authorization, EstudioController.updateEstudio)

router.post('/enfermedad/getEnfermedadByID',Authorization, EnfermedadController.getEnfermedadByID)
router.put('/enfermedad', Authorization, EnfermedadController.updateEnfermedad)

router.post('/internacion/getInternacionByID',Authorization, InternacionController.getInternacionByID)
router.put('/internacion', Authorization, InternacionController.updateInternacion)

router.post('/medicamento/getMedicamentoByID',Authorization, MedicamentoController.getMedicamentoByID)
router.put('/medicamento', Authorization, MedicamentoController.updateMedicamento)

router.get('/recetas', Authorization, RecetasController.getRecetas);
router.delete('/recetas', Authorization, RecetasController.removeReceta);
router.post('/recetas', RecetasController.createReceta);

router.get('/turnos',Authorization, TurnosController.getTurnos);
router.delete('/turnos/:id', Authorization, TurnosController.removeTurno);
router.post('/getTurnosByDNI', Authorization, TurnosController.getTurnosByDNI);
router.get('/getTurnosAnteriores', Authorization, TurnosController.getTurnosAnteriores);
router.post('/turnos', TurnosController.createTurno);

router.get('/dispTurnos', Authorization, DispTurnosController.getDispTurnos);
router.post('/dispTurnos', DispTurnosController.createDispTurno);
router.delete('/dispTurnos', Authorization, DispTurnosController.removeDispTurno);
router.put('/dispTurnos', Authorization, DispTurnosController.updateDispTurnos);

// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login