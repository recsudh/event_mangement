const mongoose= require("mongoose")
const bcryptjs= require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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

    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{
    timestamps:true
})


// gerating auth token

userSchema.methods.generatetoken= async function(){
    const User = thisu
    if(User.role==="admin"){
        const token = await jwt.sign({_id:User._id},process.env.JWT_SECRET_ADMIN)
    }
    else{
        const token = await jwt.sign({_id:User._id},process.env.JWT_SECRET_USER)
    }
    if(!token){
        throw new Error("Invalid token!!")
    }
    
    return token
}

// find by credentials 
userSchema.statics.findbycredential=async function(email,password){
    const User = await user.findOne({email})
    if(!user){
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

userSchema.pre("save",async function(next){
    const User = this
    if(User.isModified("password")){
        User.password = await bcryptjs.hash(User.password,8)
    }
    next()
})

const user = mongoose.model("user",userSchema)

module.exports = user