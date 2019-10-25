var express = require('express');
var router = express.Router();
var FarmersController = require('../controllers/farmer.js');


router.get('/', FarmersController.list);
//router.get('/booth/:id', FarmersController.booth)
router.post('/create', FarmersController.create);

module.exports = router;