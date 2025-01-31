const jwt=require('jsonwebtoken')
const User=require('./../models/User')
const dotenv=require('dotenv')
exports.protect=async(req,res,next)=>{

    let token =req.header("Authorization").trim();
    
    console.log(token)
    if(!token){
        return res.status(401).json({
            success:false,
            error:'Not authorized to access this route'
        })
    }
    try{
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decoded.id)
        console.log(decoded)
        next()
    }
        catch(error){
            return res.status(500).json({
                success:false,
                error:error.message
            })
        }
}