const express = require('express');
const router = express.Router();
const {verifyToken, verifyTokenANdAUthorization} = require('../controllers/verifyToken');
const { createCart, updateCart, deleteCart } = require('../controllers/cart_controller');

router.post('/', verifyToken, createCart); 
router.post('/:id', verifyTokenANdAUthorization, updateCart);
router.get('/:userId', verifyTokenANdAUthorization, deleteCart);


module.exports = router;