const User = require("../models/user");
const express = require("express");
const {z}= require("zod")
const {signup}= require("../middlewares/validation")

const user_router = express.Router();

user_router.post("/register",signup,async(req,res)=>{
    try{
       console.log(req.body);
        const user = User(req.body)
        await user.save()
         res.json({
        message:"successfull!!",
        user
       })
    

    }catch(e){
        console.log(err);
        res.json({
        message:"unsuccessfull!!",
        Error: e.Error
       })
    }

} )

// login route 
user_router.post("/login",async(req,res)=>{
     try{
        const {email,password }= req.body
        const user = await User.findbycredential(email,password)
        const token = await user.generatetoken()
        res.status(200).json({
            message:"Verified",
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




module.exports= user_router