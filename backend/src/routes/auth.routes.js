const express = require("express")
const { UserModel } = require("../models/user.model")
const bcryptjs  = require("bcryptjs")
const JWTUtils = require("../utils/jwt")
const { verifyUser } = require("../middleware/AuthMiddlware")
const router = express.Router()

router.post("/register",async(req,res)=>{
    try {
                const {  name,email,password } = req.body
                if(!name || !email || !password){
                    return   res.status(400).send({
                        error:'please Fill All Details',
                        success:false
                    })
                }

                    //  user exist or not
                    const user = await UserModel.findOne({
                        email
                    })

                    if(user){
                        return   res.status(400).send({
                            error:'user Already exist',
                            success:false
                        })
                    }

                    await UserModel.create({
                        name,email,password
                    })

                    // 
                    return   res.status(201).send({
                        msg:'Register Succesfully',
                        success:true
                    })

    } catch (error) {
      return  res.status(400).send({
            error:error.message,
            success:false
        })
    }
})


router.post("/login",async(req,res)=>{
    try {
                const {  email,password } = req.body
                if( !email || !password){
                    return   res.status(400).send({
                        error:'please Fill All Details',
                        success:false
                    })
                }

                    //  user exist or not
                    const user = await UserModel.findOne({
                        email
                    })

                    if(!user){
                        return   res.status(400).send({
                            error:'user Not exist',
                            success:false
                        })
                    }

                    const isMatch = await bcryptjs.compare(password,user.password)
                    if(!isMatch){
                        return   res.status(400).send({
                            error:'Invalid Credentials',
                            success:false
                        })
                    }
                    const token =JWTUtils.generateToken({
                        userId:user._id
                    })

                    // 
                    return   res.status(201).send({
                        msg:'Login Succesfully',
                        success:true,
                        token
                    })

    } catch (error) {
      return  res.status(400).send({
            error:error.message,
            success:false
        })
    }
})

router.get("/profile",verifyUser,async(req,res)=>{
    try {
                
               
                    //  user exist or not
                    const user = await UserModel.findById(req.user)

                    if(!user){
                        return   res.status(400).send({
                            error:'user Not exist',
                            success:false
                        })
                    }

                   
                    // 
                    return   res.status(201).send({
                        msg:'Profile Fetch Succesfully',
                        success:true,
                        user
                    })

    } catch (error) {
      return  res.status(400).send({
            error:error.message,
            success:false
        })
    }
})

router.put("/update-profile",verifyUser,async(req,res)=>{
    try {
        const {  email,name } = req.body
        if( !email || !name){
            return   res.status(400).send({
                error:'please Fill All Details',
                success:false
            })
        }

                    //  user exist or not
                    const user = await UserModel.findById(req.user)

                    if(!user){
                        return   res.status(400).send({
                            error:'user Not exist',
                            success:false
                        })
                    }
                            await UserModel.findByIdAndUpdate(req.user,{
                                email,name
                            })
                   
                    // 
                    return   res.status(201).send({
                        msg:'Profile Update Succesfully',
                        success:true 
                    })

    } catch (error) {
      return  res.status(400).send({
            error:error.message,
            success:false
        })
    }
})

router.delete("/delete-account",verifyUser,async(req,res)=>{
    try {
       

                    //  user exist or not
                    const user = await UserModel.findById(req.user)

                    if(!user){
                        return   res.status(400).send({
                            error:'user Not exist',
                            success:false
                        })
                    }
                            await UserModel.findByIdAndDelete(req.user)
                   
                    // 
                    return   res.status(200).send({
                        msg:'Account Delete Succesfully',
                        success:true 
                    })

    } catch (error) {
      return  res.status(400).send({
            error:error.message,
            success:false
        })
    }
})


module.exports = router