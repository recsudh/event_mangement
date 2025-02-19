const User = require("../models/user");
const Event = require("../models/event")
const express = require("express");
const {z}= require("zod")
const {signup,login}= require("../middlewares/validation")
const user_auth= require("../middlewares/auth")

const user_router = express.Router();

user_router.post("/user/register",signup,async(req,res)=>{
    try{
       console.log(req.body);
        const user = User(req.body)
        await user.save()
         res.json({
        message:"successfull!!",
        user
       })
    

    }catch(e){
        // console.log(err);
        res.json({
        message:"unsuccessfull!!",
        Error: e.Error
       })
    }

} )

// login route 
user_router.post("/user/login",login,async(req,res)=>{
     try{
        console.log(req.body)
        const {email,password }= req.body
        const user = await User.findbycredential(email,password)
        const token = await user.generatetoken()
        res.status(200).json({
            message:"Verified",
            user,
            token
        })
    
        // console.log({user,token})

     }catch(e){
        console.log(e);
        res.status(500).send({
            message:"unsuccessfull!!",
            Error: e.Error
           })
     }
})

user_router.get("/user/event",user_auth,async(req,res)=>{
    try{
        let event = await Event.find({})
        if(!event){
            throw new Error("No event found")
        }
        res.status(200).send({
            status:"successfull",
            event
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            message:"unsuccessfull!",
            Error:e.message
        })
    }
})



module.exports= user_router