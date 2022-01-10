const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainControllers');

router.get('/', mainControllers.home);


router.get('/buscarComando', mainControllers.buscarComando);
router.get('/encenderServicio', mainControllers.encenderServicio);
router.get('/apagarServicio', mainControllers.apagarServicio);

module.exports = router;