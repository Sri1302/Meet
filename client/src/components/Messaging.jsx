import { useLocation } from "react-router-dom"
import MessageFooter from "./MessageFooter"
import { useUser } from "@clerk/clerk-react"

//import socket.io-client
import io from 'socket.io-client'

//establish a connection with the server
const socket = io.connect('https://meet-backend-pink.vercel.app/')


export default function Messaging(){
    const location =useLocation()
    const{user}= useUser()
    const name = user.fullName
    const messageObj = location.state
    
   
    return <div>
        <br/>
         {`${messageObj.message.name} wants a partner for  ${messageObj.message.message} `}
         <br/>
         <br/>
        Start your conversation with {messageObj.message.name}

    
        <MessageFooter message={messageObj} socket={socket} />
    </div>
}