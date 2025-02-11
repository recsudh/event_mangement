const User = require("../models/user");
const express = require("express");
const {z}= require("zod")
const {signup}= require("../middlewares/validation")

const user_router = express.Router();

user_router.post("/register",signup,async(req,res)=>{
    try{
       console.log(req.body);
       res.json({
        message:"successfull!!"
       })
    

    }catch(e){
        // console.log(err);
    }

} )


module.exports= user_router