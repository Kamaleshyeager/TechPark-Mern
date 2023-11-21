import express from 'express'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()


import { authUser,deleteUsers,getAllUsers,getUserProfile,registerUser, updateUserProfile} from '../Controller/userController.js'
import { admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,admin,getAllUsers)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUsers)
export default router
