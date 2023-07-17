const express = require(`express`);
const userController = require(`../controllers/user_controller`)
const router = express.Router();

router.get('/',(req, res)=>{
    res.send('signup page');
});

router.post('/', userController.createUser );

module.exports = router;