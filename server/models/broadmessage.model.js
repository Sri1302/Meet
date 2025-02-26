import mongoose from 'mongoose'

const broadcastmsg = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
},{timestamps:true})

const BroadcastMsg = mongoose.model('BroadcastMsg',broadcastmsg)

export default BroadcastMsg