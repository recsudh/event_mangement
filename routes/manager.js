const Manager = require("../models/manager")
const express = require("express")
const {signup,login}= require("../middlewares/validation")
const {manager_auth}=require("../middlewares/auth")
const Event= require("../models/event")
const main= require("../utils/mail")

const manager_route = express.Router();

manager_route.post("/manager/register",signup,async(req,res)=>{
    try{
        const {name,email,password} = Manager(req.body)
        const manager = new Manager({name,email,password})
        await main(email,name)
        await manager.save()
        // console.log(manager);
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

// logout route
manager_route.post("/manager/logout",manager_auth,async(req,res)=>{
    try{
        const token =" "
        res.status(200).json({
            message:"successfully logged out!!",
            token
        })
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:"unsuccessfull!!",
            Error: e.message
           })
    }
})


// ----------------------// events creation//-----------------------------------------//

manager_route.post("/manager/create",manager_auth,async (req,res)=>{
    try{
        console.log(req.body);
        const {title,description,category,location,price} = req.body
        const event_manager_id= req.manager_id
        const date = Date.now()
        // const event_manager= "001"
        await Event.create({title,description,category,location,date,price,event_manager_id})
        res.status(201).send({
            message:"successfull!!"
            })
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:"failed!!",
            Error:e.message
        })
    }
})

manager_route.get("/manager/fetch_all",manager_auth,async(req,res)=>{
    try{
        const event = await Event.find({})

        res.status(200).send({
            status:"successfull!",
            event
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            message:"unsuccessfull!!",
            Error: e.message
           })
    }
})

manager_route.get("/manager/fetch",manager_auth,async(req,res)=>{
    try{
        const event_manager_id= req.manager_id
        console.log(typeof(event_manager_id))
        const event = await Event.find({event_manager_id})
        res.status(200).send({
            status:"successfull!",
            event
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            message:"unsuccessfull!!",
            Error: e.message
           })
    }
})
// update

manager_route.patch("/manager/update/:_id",manager_auth,async(req,res)=>{
    try{
        const event = await Event.findOne({_id:req.params._id})
        const update=req.body
        Object.assign(event,update)
        await event.save()
        res.status(202).send({
            status:"succesfull",
            event
        })
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:"unsuccessfull!!",
            Error: e.message
           })
    }
})


// delete
manager_route.delete("/manager/delete/:_id",manager_auth,async(req,res)=>{
    try{
        const event= await Event.findByIdAndDelete({_id:req.params._id})
        if(!event){
            throw new Error("No event found")
        }
        res.status(202).send({
            status:"succsessfully deleted",
            event 
        })

    }catch(e){
        console.log(e)
        res.status(500).send({
            message:"unsuccessfull!!",
            Error: e.message
           })
    }
})

module.exports= manager_route