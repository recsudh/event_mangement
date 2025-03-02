const jwt = require("jsonwebtoken")

async function user_auth(req,res,next){
    // console.log(req.headers )
    const token = req.header("Authorization").replace("Bearer ","")
    if(!token){
        throw new Error("Invalid token!!")
    }
    console.log(token)
    const decode = jwt.verify(token,process.env.JWT_SECRET_USER)
    if(!decode){
        throw new Error("Invalid token!!")
    }
    req.token = token
    req.user_id=decode._id
    next()
    // console.log(decode )
}

async function manager_auth(req,res,next){
    // console.log(req.headers )
    try{
    const token = req.header("Authorization").replace("Bearer ","")
    if(!token){
       throw new Error("invalid token")
    }
    console.log(token)
    const decode = jwt.verify(token,process.env.JWT_SECRET_ADMIN)
    if(!token){
        throw new Error("invalid token")
    }
    req.token = token
    req.manager_id=decode._id
    next()
    }catch(e){
        // console.log(e);
        res.status(500).json({
            message:"unsuccessfull!!",
            token:"invalid token",
            Error:e.message
           })
    }
    
}
module.exports={user_auth,manager_auth}