import express from 'express'
import { createMessage,deleteMessage,getMessages } from '../controllers/broadcastmsg.controller.js'

const router = express.Router()

router.post('/createMessage',createMessage)
router.delete('/deleteMessage',deleteMessage)
router.post('/all',getMessages)

export default router