const express = require('express');
const router = express.Router();
const { validarLogin } = require('../helpers/validarLogin');
const validarRegistroBot = require('../helpers/validarRegistroBot');
const mainControllers = require('../controllers/mainControllers');

router.get('/home', mainControllers.home);
// Rutas del login
router.get('/', mainControllers.showLogin);
router.post('/', validarLogin ,mainControllers.processLogin);

router.get('/agregarBot', mainControllers.addBot);
router.post('/agregarBot', validarRegistroBot ,mainControllers.agregarBot);

router.get('/editarBot/:nombreBot/:host', mainControllers.editarBot);
router.post('/editarBot/:nombreBot/:host/:ip', validarRegistroBot ,mainControllers.editarBotPost);
router.get('/eliminarBot', mainControllers.eliminarBot);

router.get('/infoBot/:nombreBot/:host', mainControllers.infoBot);

router.post('/agregarServicioBot', mainControllers.agregarServicioBot);
router.post('/actualizarEstadoServicio', mainControllers.actualizarEstadoServicio);
router.post('/actualizarEstadoServicioApagado', mainControllers.actualizarEstadoServicioApagado);

router.get('/test', mainControllers.test);
module.exports = router;