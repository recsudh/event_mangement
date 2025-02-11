const mongoose= require("mongoose")
const bcryptjs= require("bcryptjs")

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