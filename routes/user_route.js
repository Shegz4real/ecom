const express = require(`express`);
const router = express.Router();
const {verifyTokenANdAUthorization} = require('../controllers/verifyToken');
const {editUserInfo, getUserInfo}  = require('../controllers/user_controller');


router.get('/:id', verifyTokenANdAUthorization, getUserInfo)
router.put('setting/:id', verifyTokenANdAUthorization, editUserInfo);



module.exports = router;