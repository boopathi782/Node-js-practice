const jwt = require('jsonwebtoken');


const verifyToken = (req,res, next)=>{

    let token =req.headers["authorization"];
    token = token.split(' ')[1];

        if(token){
                jwt.verify(token, "Acccesss", (err, user)=>{
                        if(!err){
                                console.log("--------------user data------------------>>>>>",user);
                                req.user = user;
                                next();
                        }
                        else{
                                req.user = null;
                                return  res.status(401).json({message: "user not authenticated  "})
                        }
                });
        }else{
                res.send("token is required")
                req.user = null; 
   }


}

module.exports = verifyToken;
