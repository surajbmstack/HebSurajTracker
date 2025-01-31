const User=require('./../models/User')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const dotenv=require('dotenv')
exports.register=async(req,res)=>{
    try{
        const{username,password}=req.body
        if(!username || !password){
            return res.status(400).json({
                success:false,
                error:'Please provide username and password'
            })
        }
        const existinUser=await User.findOne({username})
        if(existinUser){
            return res.status(400).json({
                success:false,
                message:'User already exists'
            })
        }
        const user=await User.create({username,password})
        const token=jwt.sign({username:user.username,id:user._id},process.env.JWT_SECRET,{
            expiresIn:'30d'
        })
       return res.status(201).json({
            success:true,
            user,token
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.login=async(req,res)=>{
 const{username,password}=req.body
 if(!username || !password){
     return res.status(400).json({
         success:false,
         error:'Please provide username and password'
     })
 }
    try{
        const user=await User.findOne({username:username})
        if(!User){
            return res.status(400).json({
                success:false,
                error:'Invalid credentials'
            })
        }
        const isUserValid= password==user.password
        if(isUserValid){
            const token=jwt.sign({username:user.username,id:user._id},process.env.JWT_SECRET,{
                expiresIn:'30d'
            })
            return res.status(200).json({
                success:true,
                user:user,
                token
            })
        }else{
            return res.status(400).json({
                success:false,
                error:'Invalid credentials'
            })
        }
      
}
catch(error){
    res.status(500).json({
        success:false,
        error:error.message
    })
}
}
exports.updateUser=async(req,res)=>{
    try{
        const {balance}=req.body
        const user=await User.findById(req.user._id)
        if(!user){
            return res.status(404).json({
                success:false,
                error:'User not found'
            })
        }
        user.balance=balance
        await user.save()
        return res.status(200).json({
            success:true,
            user
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
exports.getUser=async(req,res)=>{
try{
 const user =await User.findById(req.user.id).populate('expenses')
    if(!user){
        return res.status(404).json({
            success:false,
            error:'User not found'
        })
    }
    return res.status(200).json({
        success:true,
        user
    })
}
catch(error){
    res.status(500).json({
        success:false,
        error:error.message
    })
}
}