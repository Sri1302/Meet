import express from 'express'
import { createUser,getUsers,updateUser,findUser } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/',createUser)
router.post('/all',getUsers)
router.put('/updateUser',updateUser)
router.post('/findUser',findUser)

export default router