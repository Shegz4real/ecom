const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{

    const authHeader = req.headers.token;

    if(authHeader){

        const token = authHeader.split(" ")[1] //split the header into two parts seperated by a space and pick the second item in the array
         
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{

            if(err){ 
                res.status(403).json('token not valid');
            };
            req.user = user;

            next();
        });
         
    }else{
        return res.status(401).json("you are not authenticatied")
    }
}

//check if user is verified for carrying out operation
const verifyTokenANdAUthorization = (req, res, next)=>{

    verifyToken(req, res, ()=>{

        console.log(`${req.user.id} /n${req.params.id}`);
        if(req.user.id == req.params.id || req.user.isAdmin ){
            next()
        }else {
            res.status(403).json('you are not allowed to do that!')
        }
    });
}

const verifyTokenAndAdmin = (req, res, next)=>{

    verifyToken(req, res, ()=>{
        console.log(req.user.isAdmin)
        if(req.user.isAdmin){
            next()
        }else if(req.user.isAdmin == null) {
            res.status(403).json("login")
        }else {
            res.status(403).json('you are not authorized to do that!');
        }
    });
}


module.exports = {verifyToken, verifyTokenANdAUthorization, verifyTokenAndAdmin };