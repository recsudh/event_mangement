const User = require("../models/user");
const express = require("express");
const {z}= require("zod")

const user_router = express.Router();

user_router.post("/register",async(req,res)=>{
    try{
       
        const requirebody= z.object({
            name: z.string(),
            email:z.string().email(),
            password: z.string().min(5)
        })
    }catch(e){
        
    }

} )
