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

router.get('/infoBot/:nombreBot', mainControllers.infoBot);
router.get('/test', mainControllers.test);
module.exports = router;