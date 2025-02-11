const mongoose= require("mongoose")

const event = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        date:Date.now
    }
})

const Event = mongoose.model("Event",event)

module.exports = Event