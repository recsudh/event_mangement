const mongoose = require('mongoose');   

const mongo= async ()=>{        
    try{
        const connection_instance = await mongoose.connect(process.env.MONGO_URI)
        if(connection_instance){
            console.log(`MongoDB connected: ${connection_instance.connection.host}`)
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports= mongo