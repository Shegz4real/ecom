const express = require('express');
const router = express.Router();
const {verifyToken, verifyTokenANdAUthorization, verifyTokenAndAdmin} = require('../controllers/verifyToken');
const { createCart, updateCart, deleteCart, getAllcarts, getCart } = require('../controllers/cart_controller');

router.post('/', verifyToken, createCart);
router.get('/:userId', verifyTokenANdAUthorization, getCart );
router.put('/:id', verifyTokenANdAUthorization, updateCart);
router.delete('/:id', verifyTokenANdAUthorization, deleteCart);
router.get('/all', verifyTokenAndAdmin, getAllcarts);


module.exports = router;