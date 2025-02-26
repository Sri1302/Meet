import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRoutes from './routes/user.route.js'
import cors from 'cors'
import http from 'http'
import { Server } from "socket.io";
import messageRoutes from './routes/personalmsg.route.js'

import broadcastMsg from './routes/broadcastmsg.route.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

//create socket.io instance
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",//allow requests from this url
    methods:["POST","GET"]
  }
}
)

app.use('/api/users',userRoutes)
app.use('/api/broadcastmsg',broadcastMsg)
app.use('/api/message',messageRoutes)


io.on("connection",(socket)=>{
  console.log(`user connected ${socket.id}`)
  socket.on("join-room",(room)=>{
    socket.join(room)
    console.log(`joined ${room}`)
  })
  socket.on("send-message",(messageObj)=>{
    console.log(messageObj)
    const receiver = messageObj.room
    io.to(receiver).emit("receive-message",messageObj)
  })

})



mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  server.listen(3000,()=>{
    console.log("Hello World")
  })
})
.catch((e)=>{
  console.log(e)
})



