import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from './viewandsendmsg.module.css'

export default function VeiwAndSendMsg(){
    const location =useLocation()
    const message = location.state
    const [messages,setMessages] = useState([])
    const navigate = useNavigate()
    const {user} = useUser()
    
    useEffect(()=>{
       
        async function getMessages(){
            const res = await fetch('https://meet-backend-pink.vercel.app/api/message/getMessages',{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({room:message.message.message})
            })
            const data = await res.json()
            console.log(data)
            setMessages(data.data)
        }
        getMessages()
    },[])
    return <div className={styles.container}>
        
        {messages ?messages.map((message)=>  message.sender!==user.fullName?<>  <><h5> {message.message} </h5> <p>sent by {message.sender} </p> </><button onClick={()=>navigate('/reply',{state:{message}})} >send reply to {message.sender}</button> </>:""):"No msg found"}
    </div>
}
