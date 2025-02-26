import Message from "../models/personalmsg.model.js"

const createMessage =async (req,res) =>{
    const {sender,message,room} = req.body
    try{
        const newMessage = await Message.create({sender,message,room})
        res.status(200).json({msg:"Message Created Successfully",data:newMessage})
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

const getMessages =async (req,res)=>{
    const {room} = req.body
    try{
        const messages = await Message.find({room})
        res.status(200).json({data:messages})
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

const deleteMessage = async (req,res)=>{
    const {id} = req.body
    try{
        await Message.findByIdAndDelete(id)
        res.status(200).json({msg:"Message Deleted Successfully"})
    }
    catch(e){
        re.status(400).json({error:e.message})
    }
}

export {createMessage,getMessages,deleteMessage}