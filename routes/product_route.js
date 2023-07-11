const express = require('express');
const { verifyTokenAndAdmin } = require('../controllers/verifyToken');
const { createProduct, editProduct, deleteProduct, selectProduct } = require('../controllers/product_controller')
const router = express.Router();

router.get('/:id', selectProduct );
router.post('/create', verifyTokenAndAdmin, createProduct);
router.post('/:id',verifyTokenAndAdmin, editProduct );
router.delete('/:id', verifyTokenAndAdmin, deleteProduct );

module.exports = router;