const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainControllers');

router.get('/home', mainControllers.home);
// Rutas del login
router.get('/', mainControllers.showLogin);
router.post('/', mainControllers.processLogin);

router.get('/infoBot/:idBot', mainControllers.infoBot);
router.get('/test', mainControllers.test);
module.exports = router;