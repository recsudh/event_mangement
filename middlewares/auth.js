const jwt = require("jsonwebtoken")

async function user_auth(req,res,next){
    // console.log(req.headers )
    const token = req.header("Authorization").replace("Bearer ","")
    if(!token){
        throw new Error("Invalid token!!")
    }
    console.log(token)
    const decode = jwt.verify(token,process.env.JWT_SECRET_USER)
    if(!token){
        throw new Error("Invalid token!!")
    }
    req.token = token
    next()
    console.log(decode )
}

module.exports=user_auth