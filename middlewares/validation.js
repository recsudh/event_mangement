const {z}= require("zod")

function signup(req,res,next){
   
    const requirebody= z.object({
        name: z.string(),
        email:z.string().email(),
        password: z.string().min(5)  
    })

    const out= requirebody.safeParse(req.body)
    // console.log(out)

    if(out.error){
        return res.json({
            message:"unsuccessful",
            Error: out.error.issues
        })
    }
    next()

}

// login validation
function login(req,res,next){
   
    const requirebody= z.object({
        email:z.string().email(),
        password: z.string().min(5)  
    })

    const out= requirebody.safeParse(req.body)
    // console.log(out)

    if(out.error){
        return res.json({
            message:"unsuccessful",
            Error: out.error.issues
        })
    }
    next()

}

module.exports={signup,login}