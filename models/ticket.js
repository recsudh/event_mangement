const mongoose= require("mongoose")

const ticketschema= new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    event_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
        required:true
    },
    event_details:{
        type:String,
    },
    qunatity:{
        type:Number,
        default:1,
        required:true
    },
    date:{
        type:Date,
        date:Date.now()
        
    }

})

const ticket = mongoose.model("ticket",ticketschema)

module.exports=ticket