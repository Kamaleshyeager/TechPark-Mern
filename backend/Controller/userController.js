import asyncHandler from 'express-async-handler'
import User from '../models/usermodel.js'
import generateToken from '../utils/generateToken.js'


const authUser = asyncHandler(async (req,res) =>{

const {email,password}=req.body

const user = await User.findOne({email})

if (user && (await user.matchPassword(password))){
res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token:generateToken(user._id)
})
} else{
    res.status(401)
    throw new Error('Invalid email or password')
}

})

//register new user
//post
//public
const registerUser = asyncHandler(async (req,res) =>{

    const {name,email,password}=req.body
    
    const userExist = await User.findOne({email})
    
    if(userExist){
        res.status(400)
        throw new Error('user already exists')
    }


    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id:user._id,
             name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
  
    } )



//get/user/profile
//get 
//private
const getUserProfile = asyncHandler(async (req,res) =>{

    const user = await User.findById(req.user._id)
    if(user){

        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })

    }else{
        res.status(404)
    }
    
    } )



//api/user/profile
//put
//private
const updateUserProfile = asyncHandler(async (req,res) =>{

    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser  = await user.save()
        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        })

    }else{
        res.status(404)
        throw new Error ('User not found')
    }
    
    } )



    //get/user
//get 
//private Admin
const getAllUsers = asyncHandler(async (req,res) =>{

   const users = await User.find({})
     res.json(users)
    })

//delete user
//DELETE /api/user/:id
const deleteUsers = asyncHandler(async (req,res) =>{

   const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json( { message:'user Removed'})
   } else {
res.status(404)
throw new Error ("User not Founddadadad")
   }
     
    })


export {authUser ,getUserProfile,registerUser,updateUserProfile,getAllUsers,deleteUsers}