const mongoose = require("mongoose")

const otp_schema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    manager_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"manager"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // Expires after 300 seconds (5 minutes)
    }
})

const otp= mongoose.model("otp",otp_schema)

module.exports= otp