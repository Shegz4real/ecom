const User = require(`../models/user_model`);
const hash = require(`./hasher`)


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
        await user.save();
        req.session.user = user;
        req.session.authorized = true;
        res.redirect(`/`);    

    }catch(e){
        console.log(e);
    }

}

//@desc ..... login existing user
//@route .......

exports.loginUser = async (req, res)=>{

    const {email, password} = req.body;
    try{
        const user = User.findOne({email});
        !user && req.status(200).redirect(`/login`);
        if(user.password != password){
            console.log("wrong password");
            res.json("wrong credentials")
        }
        req.session.user = user;
        req.session.authorized = true;

        
    }catch(e){
        console.log(e);
    }
}