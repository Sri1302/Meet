import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Broadcastmsgs({location}){
    const [messages,setMessages] = useState([])
    const {user} = useUser()
    const name = user.fullName
    const navigate = useNavigate()
    useEffect(()=>{
        const getAllMessages = async  ()=>{
            const res= await fetch('https://meet-backend-pink.vercel.app/api/broadcastmsg/all',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({location})
            })
            const data = await res.json()
            console.log(data.msgs)
            setMessages(data.msgs)
        }
        getAllMessages()
    },[])

    async function handleDelete(id){
        const res = await fetch('https://meet-backend-pink.vercel.app/api/broadcastmsg/deleteMessage',{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id})
        })
        const data = await res.json()
        console.log(data)

        //remove deleted messages from ui
        setMessages((messages)=>messages.filter((msg)=>msg._id!==id))
    }
  

    
    
    return <div>List of broadcast messages....
        
    {messages.map((message)=>
    message.location===location?<div><p>Posted by {message.name} at {message.createdAt}</p> {message.message} {message.name===name ?<><button onClick={()=>{handleDelete(message._id)}}>Close</button>  <button onClick={navigate('/veiwAndSendMsg',{state:{message}})}>Veiw Messages</button> </>:  message.message? <button onClick={()=>navigate('/message',{state:{message}})}>Message</button> :""} </div>:"No msgs found"
    )}

    </div>
}