const express = require("express")
const Event = require("../models/event.js")


const route = express.Router()

route.post("/create",async (req,res)=>{
    try{
        console.log(req.body);
        const {title,description,location} = req.body
        const date = Date.now()
        // const event_manager= "001"
        await Event.create({title,description,location,date})
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




module.exports= route