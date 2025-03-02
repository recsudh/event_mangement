const mongoose= require("mongoose")
const bcryptjs= require("bcryptjs")
const jwt = require("jsonwebtoken")

const managerschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true

    },
    mobile_no:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:"manager"
    }
},{
    timestamps:true
})


// gerating auth token

managerschema.methods.generatetoken= async function(){
    const User = this
    const token = await jwt.sign({_id:User._id},process.env.JWT_SECRET_ADMIN)
    if(!token){
        throw new Error(" token not generated!!!")
    }
    
    return token
}

// find by credentials 
managerschema.statics.findbycredential=async function(email,password){
    const User = await manager.findOne({email})
    if(!User){
        throw new Error("user not found!!")
    }
    // console.log(User);
    const is_match = await bcryptjs.compare(password,User.password)
    // console.log(is_match);
    if(!is_match){
        throw new Error("Invalid password!!")
    }
    return User
}


// password hashing

managerschema.pre("save",async function(next){
    const Manager = this
    if(Manager.isModified("password")){
        Manager.password = await bcryptjs.hash(Manager.password,8)
    }
    next()
})

const manager = mongoose.model("manager",managerschema)

module.exports = manager
