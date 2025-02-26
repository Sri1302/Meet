import express from 'express'

import { createMessage,getMessages,deleteMessage } from '../controllers/personalmsg.controller.js'

const router =  express.Router()

router.post('/createMessage',createMessage)

router.post('/getMessages',getMessages)

router.delete('/deleteMessage',deleteMessage)

export default router