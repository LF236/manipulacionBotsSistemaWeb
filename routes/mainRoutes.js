const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainControllers');

router.get('/home', mainControllers.home);
router.get('/', mainControllers.showLogin);
router.get('/infoBot/:idBot', mainControllers.infoBot);
router.get('/test', mainControllers.test);
module.exports = router;