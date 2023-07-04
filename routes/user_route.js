const express = require(`express`);
const router = express.Router();
const {verifyToken, verifyTokenANdAUthorization} = require('../controllers/verifyToken');
const userController  = require('../controllers/user_controller');

router.get('/', (req, res)=>{
    res.send('user login')
});

router.post('/', (req, res)=>{
    const username = req.body.username
    console.log(`${username}`);
    res.send('this shit is working');
});

router.put('/:id', verifyTokenANdAUthorization, userController.editUserInfo)


module.exports = router;