import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
    // location:{
    //     type:{
    //         type:String,
    //         enum:["Point"],
    //         required:true
    //     },
    //     coordinates:{
    //         type:[Number],
    //         required:true,
    //         index:"2dsphere"
    //     }

    // }
   
})

const User= mongoose.model("User",userSchema)

export default User