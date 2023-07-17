const express = require('express');
const router = express.Router();
const {verifyToken, verifyTokenANdAUthorization, verifyTokenAndAdmin} = require('../controllers/verifyToken');
const { createCart, updateCart, deleteCart, getAllcarts } = require('../controllers/cart_controller');

router.post('/', verifyToken, createCart); 
router.post('/:id', verifyTokenANdAUthorization, updateCart);
router.get('/:userId', verifyTokenANdAUthorization, deleteCart);
router.get('/all', verifyTokenAndAdmin, getAllcarts)


module.exports = router;