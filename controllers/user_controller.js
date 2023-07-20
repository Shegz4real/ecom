const User = require(`../models/user_model`);
const jwt = require('jsonwebtoken');
const bcrypt = require(`bcrypt`)
const {hashPassword} = require(`./hasher`);


//@desc ... find if email exist in db
async function userExist(email){
    try{
        const user = await User.findOne({email});
        !user && console.log('new email')
        return !user;

    }catch(e){
        console.log(e)
    }
}

//@desc .... create new user
//@route .... signup/

exports.createUser = async (req, res)=>{

    try{
       
        const user = new User(req.body);
        user.password = hashPassword(req.body.password);
        await user.save();

        req.session.user = user;
        req.session.authorized = true;

        const payload_user = {id:user._id, isAdmin:user.isAdmin}
        const accessToken = jwt.sign(payload_user , process.env.JWT_SEC, 
        {expiresIn:'3d'}
        );

        res.status(200).json(user);    

    }catch(e){
        console.log(e);
    }

}

//@desc ..... login existing user
//@route ....... /login

exports.loginUser = async (req, res)=>{

    try{ 

        
        const user = await User.findOne({email:req.body.email}); 
        !user && req.status(401).json(`wrong credentials`);

        const isValidPassword = bcrypt.compareSync(req.body.password, user.password); 
        !isValidPassword && res.status(401).json(`wrong password`);

        const {password, ...others} = user._doc;

        const accessToken = jwt.sign({
            id:user._id, 
            isAdmin:user.isAdmin
        }, process.env.JWT_SEC, 
        {expiresIn:'3d'}
        );
        console.log(accessToken);
        res.status(200).json({...others, accessToken});
   
    }catch(e){ 
        res.status(500).json("err " +e);
    }
}

//@desc ..... user can change password
//@route ..... /user/:id/

exports.editUserInfo = async(req, res)=>{
    try{
        if(req.body.password) { req.body.password = hashPassword(req.body.password)};
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body 
        }, {new:true}
        );
        res.status(200).json(updatedUser); 
    }catch(err){res.status(500).json(err)}

} 

//@desc .... admin delete user
//@route .... admin/users/:id

exports.deleteUser = async(req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('user has been deleted');
    }catch(err){
        res.status(500).json(err);
    }
}

//@desc ....find users on admin dashboard
//@route  .... admin/users

exports.getUsers = async(req, res)=>{
    // to get the latest 5 users
    const query = req.query.new;
    try{
        const user = query 
        ? await User.find().sort({_id:-1}).limit(1) 
        : await User.find();
        res.status(200).send({data:user});

    }catch(err){
        res.status(500).json(err);
    }
}

//@desc ... find a user based on username
//@route .... /admin/user/:id, /user/:id

exports.getUserInfo = async(req, res)=>{

    try{

        const user = await User.findById(req.params.id);
        const {password, ...others } = user._doc;
        console.log({...others});
        res.status(200).json({...others});

    }catch(err){
        res.status(500).json(err)
    }
    
}

//@route ..... admin/users/stats
//@desc ...get stats about users.

exports.usersStats = async (req, res)=>{

    const date = new Date();
    console.log(date)
    const last_year = new Date(date.setFullYear(date.getFullYear() - 1));
    

    try{

        const data = await User.aggregate([
            {$match: {createdAt: {$gte:last_year } } },
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },{
                $group:{
                    _id:"$month",
                    total:{ $sum: 1 } 
                }
            }
        ]);
        res.status(200).json(data); 

    } catch(err){
        res.status(500).json(err)
    }
}