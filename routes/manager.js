const Manager = require("../models/manager")
const express = require("express")
const {signup,login}= require("../middlewares/validation")
const {manager_auth}=require("../middlewares/auth")
const manager_route = express.Router();

manager_route.post("/manager/register",signup,async(req,res)=>{
    try{
        const manager = Manager(req.body)
        await manager.save()
        console.log(manager);
         res.json({
        message:"successfull!!",
        manager
       })
    }catch(e){
        console.log(e);
        res.json({
        message:"unsuccessfull!!",
        Error: e.message
       })
    }

} )

// login route 
manager_route.post("/manager/login",login,async(req,res)=>{
     try{
        const {email,password }= req.body
        const manager = await Manager.findbycredential(email,password)
        const token = await manager.generatetoken()
        res.status(200).json({
            message:"Verified",
            token
        })
    
        // console.log({user,token})

     }catch(e){
        console.log(e);
        res.status(500).send({
            message:"unsuccessfull!!",
            Error: e.message
           })
     }
})

module.exports= manager_route