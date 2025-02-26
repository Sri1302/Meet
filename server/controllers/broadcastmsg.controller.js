import BroadcastMsg from "../models/broadmessage.model.js"

const createMessage = async (req,res)=>{
    const {name,message,location}= req.body
    try{
        const newMessage = await BroadcastMsg.create({name,message,location})
        res.status(200).json({msg:"Msg created sucessfully",data:newMessage})
    }
    catch(e){
        res.status(400).json({error:e.message})
    } 
}


const deleteMessage= async (req,res)=>{
    const {id}= req.body
    try{
        await BroadcastMsg.findByIdAndDelete(id)
        res.status(200).json({msg:"Msg deleted succesfully"})
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

const getMessages = async (req,res)=>{
    const {location} = req.body
    try{
        const messages = await BroadcastMsg.find({location})
        res.status(200).json({msgs:messages})
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

export {createMessage,deleteMessage,getMessages}