import Product from '../models/productmodel.js'
import asyncHandler from 'express-async-handler'



export const deleteProduct = asyncHandler(async (req,res) =>{


    
    const product = await Product.findById(req.params.id)
    
    if (product ){
  
        await product.remove()
        res.json({message:'Product Removed'})
    } else{
        res.status(404)
        throw new Error('Prodcut not found')
    }
    
    })

 export const createProduct = asyncHandler(async (req,res) =>{

    const product = new Product({
        name:'Sample Name',
        price : 0,
        user : req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample Brand',
        category:'Sample category',
        countInStock:1,
        numReviews:0,
        description:'Sample Discription'
    })
    

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)


    })


export const updateProduct = asyncHandler(async (req,res) =>{

   const {name,price,description,image,brand,category,countInStock} = req.body

   const product = await Product.findById(req.params.id)

   if(product){
      product.name = name 
      product.price = price 
      product.description = description 
      product.image = image 
      product.brand = brand 
      product.category = category 
      product.countInStcok = countInStock 

      const updateProduct = await product.save()
      res.json(updateProduct)
   } else {
    res.status(404)
    throw new Error('product not Found')
   }
    })





    