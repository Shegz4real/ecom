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
        user.password = hash.hashPassword(req.body.password);
        await user.save();

        req.session.user = user;
        req.session.authorized = true;

        const accessToken = jwt.sign({
            id:user._id, isAdmin:user.isAdmin
        }, process.env.JWT_SEC, 
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
        req.session.user = user;
        req.session.authorized = true;

        const accessToken = jwt.sign({
            id:user._id, isAdmin:user.isAdmin
        }, process.env.JWT_SEC, 
        {expiresIn:'3d'}
        );

        res.status(200).json({...others, accessToken});
   
    }catch(e){ 
        res.status(500).json(e)
    }
}

//@desc ..... user can change password
//@route ..... /user/:id/

exports.changeUserPassword = async(req, res)=>{
    try{

        password && hashPassword(password);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body 
        }, {new:true}
        );
        res.status(200).json(updatedUser);
    }catch(err){console.log(err);}

}  