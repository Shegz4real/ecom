const express = require('express');
const { verifyTokenANdAUthorization, verifyTokenAndAdmin } = require('../controllers/verifyToken');
const { createOrder, updateOrder } = require('../controllers/order_controller');
const router = express.Router();


router.post('/', verifyTokenANdAUthorization, createOrder);
router.put('/:id', verifyTokenAndAdmin, updateOrder);


module.exports = router;