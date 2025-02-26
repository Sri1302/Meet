import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './users.module.css'

export default function Users({location}){
    const[users,setUsers]= useState([])
    const navigate = useNavigate()
    const {user} =useUser()
    const userId = user.id
    console.log(userId)
    const userLocation = location
    console.log(userLocation)


    useEffect(()=>{
        const getUsers = async ()=>{
            try{
                const res = await fetch('https://meet-backend-9uel.onrender.com/api/users/all',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({userLocation}),
                    credentials:"include"
                })
                const data = await res.json()
                console.log(data.users)
                setUsers(data.users)
            }
            catch(e){
                console.log(error)
            }
        }
        getUsers()
    },[])

    console.log(user)
    return <div className={styles.container}>
        <label className={styles.label}>Users in {userLocation}: </label>
        {users.length>0?users.filter((user)=>user.userId !== userId).map((filtereduser)=> filtereduser?  <button onClick={()=>{navigate('/userDetailedView',{state:{filtereduser}})}} key={filtereduser.name}>{filtereduser.name}</button>:"Waiting for user"):`No users found in ${location}`}
    </div>
}