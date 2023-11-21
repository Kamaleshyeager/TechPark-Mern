import express from 'express'
import asyncHadnler from 'express-async-handler'
const router = express.Router()
import {addOrderItems, getMyOrder, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid} from '../Controller/orderController.js'
import protect from '../middleware/authMiddleware.js'
import {admin} from '../middleware/authMiddleware.js'

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrder)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/delivered').put(protect,admin,updateOrderToDelivered)


export default router
