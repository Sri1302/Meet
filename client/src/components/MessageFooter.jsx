import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import styles from './messagefooter.module.css'

export default function MessageFooter({socket,message}){
    const [cmessage,setCmessage] = useState("")
    const [messages,setMessages] = useState([])
    const [displymsg,setDisplymsg] = useState([])
    const {user} = useUser()
    const room = message.message.message
    
    function sendMessage(){
        const messageObj ={
            sender:user.fullName,
            message:cmessage,
            room:room
        }
        socket.emit("send-message",messageObj)
        setDisplymsg((prev) => [...prev, messageObj]);
        async function sendDataToBackend(){
            const res = await fetch('http://localhost:3000/api/message/createMessage',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({sender:user.fullName,message:cmessage,room:message.message.message})
            })
            const data = await res.json()
            console.log(data)
        }
        sendDataToBackend()
        setCmessage("")
    }
    useEffect(()=>{
        if(room){
            socket.emit('join-room',room)
        }
    },[room])
    useEffect(()=>{
        socket.on("receive-message",(data)=>{
            console.log(data)
            setMessages((messages)=>[...messages,data])  
        })
    },[socket])

    useEffect(()=>{
        async function getMessages(){
            const res = await fetch('http://localhost:3000/api/message/getMessages',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({room})
            })
            const data = await res.json()
            console.log(data)
            setDisplymsg(data.data)
        }
        getMessages()
    },[])
    async function deleteMessage(id){
        const res = await fetch('http://localhost:3000/api/message/deleteMessage',{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id})
        })
        const data= await res.json()
        console.log(data)

        //remove deleted item from ui
        setDisplymsg((msgs)=>msgs.filter((msg)=>msg._id!=id))
    }


    return <div className={styles.container}>
        <br/>
        <br/>
        <input className={styles.input} type="text" value={cmessage} placeholder="hi,how are you?" onChange={(e)=>setCmessage(e.target.value)}  />
        <button className={styles.send} onClick={sendMessage}>Send</button>  
        <br/>

        
        {displymsg.map((msg)=> msg.sender ===user.fullName?<div><h5>{msg.message}  </h5> <p>posted by {msg.sender} at {msg.createdAt} <button onClick={()=>deleteMessage(msg._id)}>Delete messge</button></p> </div>:"")}
    </div>
}