const express = require('express');
const router = express.Router();
const { validarLogin } = require('../helpers/validarLogin');
const mainControllers = require('../controllers/mainControllers');

router.get('/home', mainControllers.home);
// Rutas del login
router.get('/', mainControllers.showLogin);
router.post('/', validarLogin ,mainControllers.processLogin);

router.get('/infoBot/:idBot', mainControllers.infoBot);
router.get('/test', mainControllers.test);
module.exports = router;