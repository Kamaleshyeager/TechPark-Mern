import express from 'express'
import asyncHadnler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productmodel.js'
import {createProduct, deleteProduct, updateProduct} from '../Controller/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.get('/',  asyncHadnler( async (req,res)=> {
    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
     name : {
        $regex : req.query.keyword,
        $options:'i'
     }   
    } : {}


const count = await Product.countDocuments({...keyword})
const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1));
res.json({products,page,pages: Math.ceil(count/pageSize)});
}));

router.post('/',protect,admin,createProduct)

router.get('/:id', asyncHadnler( async (req,res)=> {

const product = await Product.findById(req.params.id)
if(product){
    res.json(product)
}else{
    res.status(404)
    throw new Error('Product not found')
}
}))

router.delete('/:id',protect,admin,deleteProduct)
router.put('/:id',protect,admin,updateProduct)


export default router


