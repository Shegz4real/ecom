const express = require('express');
const {verifyTokenAndAdmin} = require('../controllers/verifyToken');
const {} = require('../controllers/product_controller')
const router = express.Router();

router.get('/', verifyTokenAndAdmin, )
module.exports = router;