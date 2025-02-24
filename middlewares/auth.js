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
    const token = req.header("Authorization").replace("Bearer ","")
    if(!token){
        throw new Error("Invalid token!!")
    }
    console.log(token)
    const decode = jwt.verify(token,process.env.JWT_SECRET_ADMIN)
    if(!token){
        throw new Error("Invalid token!!")
    }
    req.token = token
    // user_id=decode._id
    next()
    // console.log(decode )
}
module.exports={user_auth,manager_auth}