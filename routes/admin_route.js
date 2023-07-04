const express = require('express');
const {verifyTokenAndAdmin} = require('../controllers/verifyToken');
const {deleteUser, getUsers } = require('../controllers/user_controller')
const router = express.Router();
 

router.get('users', verifyTokenAndAdmin, getUsers);
router.get('users/:id', verifyTokenAndAdmin, getUserInfo );
router.delete('users/:id', verifyTokenAndAdmin, deleteUser);

module.exports = router;