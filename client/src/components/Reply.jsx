import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";


export default function Reply() {
  const location = useLocation();
  const {user} =useUser()
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const message = location.state;
  
  async function handleDelete(id){
    const res = await fetch('https://meet-backend-pink.vercel.app/api/message/deleteMessage',{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id}),
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)

    //update ui after delete
    setList((list)=>list.filter((msg)=>msg._id!==id))
  }

  async function sendMessage() {
    const res = await fetch("https://meet-backend-pink.vercel.app/api/message/createMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: user.fullName,
        room: message.message.room,
        message: input,
      }),
      credentials:"include"
    });

    const data = await res.json()
    console.log(data.data)
    setList((list)=>[...list,data.data])
    setInput("")
  
  }
  useEffect(()=>{
    async function getMessages(){
        const res = await fetch('https://meet-backend-pink.vercel.app/api/message/getMessages',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({room:message.message.room}),
            credentials:"include"
        })
        const data = await res.json()
        console.log(data)
        setList(data.data)
    }
    getMessages()
  },[])
  
  return (
    <div>
      {`send reply to ${message.message.sender} for ${message.message.room}`}
      <br />
      <br />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={()=>sendMessage()}>Send Message</button>
      {list.map((message)=>message.sender===user.fullName?<> <h5>{message.message} <button onClick={()=>handleDelete(message._id)}>Delete</button></h5> <p>sent by {message.sender}</p> </>:"")}
    </div>
  );
}
