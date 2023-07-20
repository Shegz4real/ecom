const express = require(`express`)
const {loginUser} = require(`../controllers/user_controller`);
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('login page');
});

router.post('/', loginUser);

module.exports = router;