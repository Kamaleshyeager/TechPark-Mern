import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/usermodel.js'

export const protect = asyncHandler(async( req,res ,next)=>{

let token

if(req.headers.authorization ){

   try {
    
    token=req.headers.authorization.split(' ')[1]
    const decoded =jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
   } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error ("not authorized, token failed")
   } 
   
}

if(!token) {
    res.status(401)
    throw new Error("no TOKEN")
}


})


 export const admin = asyncHandler(async( req,res ,next)=>{    
    if(req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401)
        throw new Error('not autherised as admin')
    }

    
    })
export default protect