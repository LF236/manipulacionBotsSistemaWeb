const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainControllers');

router.get('/', mainControllers.home);
router.get('/infoBot/:idBot', mainControllers.infoBot);
router.get('/test', mainControllers.test);
module.exports = router;