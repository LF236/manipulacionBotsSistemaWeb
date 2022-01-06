const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainControllers');

router.get('/', mainControllers.home);
router.get('/infoBot/:idBot', mainControllers.infoBot);
module.exports = router;