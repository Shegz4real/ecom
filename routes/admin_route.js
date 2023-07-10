const express = require('express');
const {verifyTokenAndAdmin} = require('../controllers/verifyToken');
const {deleteUser, getUsers, getUserInfo, usersStats } = require('../controllers/user_controller')
const {createProducts, getProducts} = require('../controllers/product_controller')
const router = express.Router();
 

//user operation routes

router.get('/users', verifyTokenAndAdmin, getUsers);
router.get('/users/stats', verifyTokenAndAdmin, usersStats);
router.post('/users/:id', verifyTokenAndAdmin, getUserInfo );
router.delete('/users/:id', verifyTokenAndAdmin, deleteUser);

//product operation routes

router.get('/', )

module.exports = router;